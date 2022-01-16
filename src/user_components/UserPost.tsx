import { useState } from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import formatTime from "../utils/formatTime";
import {PostDiv, PostTopDiv, PostQuestionPara, LikeContainer, AnswerDiv} from './UserComponents.styled'
import {AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

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

  function renderVoteButton() {
    if (props.hasUserVoted) {
      return (
        <FaThumbsUp
          role="Voted"
          size="20px"
          className="voteIcon"
          onClick={() => props.decrementVote(props.id)}
        />
      );
    } else {
      return (
        <FaRegThumbsUp
          role="notVoted"
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
          <p style={{fontWeight:'bold'}}>No Answer yet..</p>
      );
  }

  function answerButtonText() {
    if (showAnswer) {
      return <p>{<AiFillCaretUp/>} Hide Answer</p>;
    } else {
      return <p>{<AiFillCaretDown/>} Show Answer</p>;
    }
  }

  return (
    <PostDiv >
      <PostTopDiv>
      <PostQuestionPara>{props.text}</PostQuestionPara>
        <LikeContainer>
          {renderVoteButton()}
          <p style={{margin: 'auto', position: 'relative'}} data-testid="numVotes">
            {props.votes}
          </p>
        </LikeContainer>
    </PostTopDiv>
      <p style={{marginRight: 'auto'}}>Asked By: {props.submitter}</p>
      <p>Posted: {formatTime(props.timePosted)}</p>
      <AnswerDiv>
        {props.answer ? (
          <Button data-testid="answerButton" onClick={() => toggleAnswer()}>{answerButtonText()}</Button>
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
