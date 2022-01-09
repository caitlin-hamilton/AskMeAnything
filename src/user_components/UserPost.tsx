import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaThumbsUp, FaRegThumbsUp} from "react-icons/fa";
import Button from '@material-ui/core/Button';
import formatTime from '../utils/formatTime'

interface Props {
    text: string;
    answer: string;
    submitter: string;
    id: string;
    votes: number;
    hasUserVoted: boolean;
    timePosted: number;
    incrementVote(id: string): any
    decrementVote(id: string): any
}

const UserPost = (props: Props) => {
    const [showAnswer, setShowAnswer] = useState(false)
    const [userVoted, setUserVoted] = useState(false)

    useEffect(() => {
        setUserVoted(props.hasUserVoted)
    }, [props.hasUserVoted])

    //React Hook useEffect contains a call to 'setUserVoted'. Without a list of dependencies, this can lead to an infinite chain of updates. To fix this, pass [props.hasUserVoted] as a second argument to the useEffect Hook.

    function renderVoteButton() {
        if (userVoted === true){ 
            return <FaThumbsUp data-testid="btn-decr" size='20px' className="voteIcon" onClick={() => props.decrementVote(props.id)}/>
        }
        else
        {
            return <FaRegThumbsUp data-testid="btn-incr" size='20px' className="voteIcon" onClick={() => props.incrementVote(props.id)}/>
        }
    }

    function toggleAnswer(){
        setShowAnswer(!showAnswer)
    }

    function renderReply(){
        if (props.answer && showAnswer){
            return (
                <p>{props.answer}</p>
            )
        }
        else if (!props.answer) return (
            <div className='answerDiv2'>
                <p>No Answer yet..</p>
            </div>
        )
    }

    function answerButtonText(){
        if(showAnswer){
            return 'Hide Answer'
        }
        else {
            return 'Show Answer'
        }
    }

    return (
        <div className="userPost">
            <div className='rowPost'>
            <p className="userQuestion">{props.text}</p>
            <div className="likeContainer">
                {renderVoteButton()}
                <p className="voteP" data-testid="num-of-votes">{props.votes}</p>
            </div>
            </div>
            <p className="askedBy">Asked By: {props.submitter}</p>
            <p>Posted: {formatTime(props.timePosted)}</p>
            <div className="answerDiv">
                {props.answer ? <Button onClick={() => toggleAnswer()}>{answerButtonText()}</Button> : ""}
                <div className="break"></div>
                {renderReply()}
            </div>
        </div>
      );

}

export default UserPost