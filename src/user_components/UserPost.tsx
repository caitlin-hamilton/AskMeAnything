import { useState, useEffect } from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import formatTime from "../utils/formatTime";
import {PostDiv, PostTopDiv, PostQuestionPara, LikeContainer, AnswerDiv} from './UserComponents.styled'

interface Props {
  text: string;
  answer: string;
  submitter: string;
  id: string;
  votes: number;
  hasUserVoted: boolean;
  timePosted: number;
  incrementVote(id: string): void;
  decrementVote(id: string): void;
}

const UserPost = (props: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
  }, [props.hasUserVoted]);


  function renderVoteButton() {
    if (props.hasUserVoted === true) {
      return (
        <FaThumbsUp
          data-testid="btn-decr"
          size="20px"
          className="voteIcon"
          onClick={() => props.decrementVote(props.id)}
        />
      );
    } else {
      return (
        <FaRegThumbsUp
          data-testid="btn-incr"
          size="20px"
          className="voteIcon"
          onClick={() => props.incrementVote(props.id)}
        />
      );
    }
  }

  function toggleAnswer() {
    setShowAnswer(!showAnswer);
  }

  function renderReply() {
    if (props.answer && showAnswer) {
      return <p>{props.answer}</p>;
    } else if (!props.answer)
      return (
        <div style={{fontWeight:'bold'}}>
          <p>No Answer yet..</p>
        </div>
      );
  }

  function answerButtonText() {
    if (showAnswer) {
      return "Hide Answer";
    } else {
      return "Show Answer";
    }
  }

  return (
    <PostDiv >
      <PostTopDiv>
      <PostQuestionPara>{props.text}</PostQuestionPara>
        <LikeContainer>
          {renderVoteButton()}
          <p style={{margin: 'auto', position: 'relative'}} data-testid="num-of-votes">
            {props.votes}
          </p>
        </LikeContainer>
    </PostTopDiv>
      <p style={{marginRight: 'auto'}}>Asked By: {props.submitter}</p>
      <p>Posted: {formatTime(props.timePosted)}</p>
      <AnswerDiv>
        {props.answer ? (
          <Button onClick={() => toggleAnswer()}>{answerButtonText()}</Button>
        ) : (
          ""
        )}
        <div style={{flexBasis: '100%', height:0}}></div>
        {renderReply()}
      </AnswerDiv>
      </PostDiv>
  );
};

export default UserPost;
