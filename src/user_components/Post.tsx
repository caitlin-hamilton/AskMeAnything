import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaThumbsUp, FaRegThumbsUp} from "react-icons/fa";
import Button from '@material-ui/core/Button';

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

const Post = (props: Props) => {
    const [showAnswer, setShowAnswer] = useState(false)
    const [userVoted, setUserVoted] = useState(false)

    useEffect(() => {
        setUserVoted(props.hasUserVoted)
    })

    function formatTime(timeInSeconds: number){
        //new Date()/1000
        const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
        const today = new Date()
        let posted = new Date(timeInSeconds *1000)
        const days = today.getUTCDate() - posted.getUTCDate()
        const hours = today.getUTCHours() - posted.getUTCHours()
        const minutes = today.getUTCMinutes() - posted.getUTCMinutes()
        const seconds = today.getUTCSeconds() - posted.getUTCSeconds()
        if (days >= 1){
            return rtf1.format(-days, 'days')
        }
        else if (hours > 1 && minutes <0){
            return rtf1.format(-hours+1, 'hours')
        }
        else if(hours > 1 && minutes > 0){
            return rtf1.format(-hours, 'hours')
        }
        else if(hours ==1 && minutes <=0 && (60+minutes) > 1){
            return rtf1.format(minutes, 'minutes')
        }
        else if(hours ==1 || hours ==0 && minutes <0 && seconds <0){
            return rtf1.format(-(60+seconds), 'seconds')
        }
        else if (minutes >= 1){
            return rtf1.format(-minutes, 'minutes')
        }
        else if(seconds >= 0){
            return rtf1.format(-seconds, 'seconds')
        }
        else if(seconds < 0){
            return rtf1.format(seconds, 'seconds')
        }
    }

    function renderVoteButton() {
        if (userVoted === true){
            return <FaThumbsUp size='20px' className="voteIcon" onClick={() => props.decrementVote(props.id)}/>
        }
        else
        {
            return <FaRegThumbsUp size='20px' className="voteIcon" onClick={() => props.incrementVote(props.id)}/>
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
                <p className="voteP">{props.votes}</p>
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

export default Post