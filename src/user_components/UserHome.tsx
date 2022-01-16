import { useState, useEffect } from "react";
import UserPost from "./UserPost";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import QuestionModal from "./QuestionModal";
import Question from "../Question";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import {UserPostContainer, Container} from './UserComponents.styled'
import sortArrayQuestion from '../utils/sortArrayQuestion'

interface Props {
  getQuestions(): Array<Question>;
  userId: string;
  getUserData(userId: string): Array<string>;
}

interface SortLogicI {
  votes: string | boolean;
  timePosted: string | boolean;
}

const sortLogicObj: SortLogicI = { votes: false, timePosted: "desc" };

const UserHome = (props: Props) => {
  const [questions, setQuestions] = useState(Array<Question>());
  const [userData, setUserData] = useState(Array<string>());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortLogic, setSortLogic] = useState(sortLogicObj);

  useEffect(() => {
    //initial mount
    sortQuestions("asc", props.getQuestions(), "timePosted");
    setUserData(props.getUserData(props.userId));
  }, []);

  
  function sortQuestions(
    direction: string | boolean,
    data: Array<Question>,
    attribute: keyof Question
  ) {
    let sortedData = sortArrayQuestion([...data], direction, attribute)
    updateSortLogic(attribute, direction);
    setQuestions(sortedData);
  }

  function updateSortLogic(attribute: keyof Question, direction: string | boolean) {
    const updatedSortLogic = { ...sortLogic };
    const objKeys = Object.keys(updatedSortLogic) as Array<keyof SortLogicI>;

    objKeys.forEach((key) => {
      if (key === attribute) {
        updatedSortLogic[key] = direction;
      } else {
        updatedSortLogic[key] = false;
      }
    });
    setSortLogic(updatedSortLogic);
  }
  function incrementVote(postId: string) {
    const newQuestionData = questions.map((post) => {
      if (post.id === postId) {
        post.votes = post.votes + 1;
      }
      return post;
    });
    const newUserData: string[] = [...userData];
    newUserData.push(postId);

    setUserData(newUserData);
    setQuestions(newQuestionData);
  }

  function decrementVote(postId: string) {
    const newQuestionData = questions.map((post) => {
      if (post.id === postId) {
        post.votes = post.votes - 1;
      }
      return post;
    });
    const newUserData: string[] = userData.filter((element) => {
      return element !== postId;
    });

    setUserData(newUserData);
    setQuestions(newQuestionData);
  }
  function hasUserVoted(postId: string) {
    return userData.includes(postId);;
  }
  function switchModal() {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  }

  function getNewSortDirection(attribute: keyof SortLogicI) {
    const oldDirection: string | boolean = sortLogic[attribute];
    return !oldDirection || oldDirection === "desc" ? "asc" : "desc";
  }

  function addNewQuestion(newQuestion: Question) {
    questions.unshift(newQuestion);
  }

  function buttonAttributeDirecton(attribute: keyof SortLogicI) {
    const direction = sortLogic[attribute];
    if (direction === "asc") {
      return <AiOutlineArrowDown />;
    } else if (direction === "desc") {
      return <AiOutlineArrowUp />;
    } else {
      return;
    }
  }
  return (
    <Container>
      <div className="container">
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <textarea
          onClick={() => switchModal()}
          readOnly
          placeholder="Ask us anything..."
          style={{width: '100%', height:'100px'}}
        />
        <QuestionModal
          isModalOpen={isModalOpen}
          switchModal={() => switchModal()}
          addNewQuestion={addNewQuestion}
          userId={props.userId}
          numberOfQuestions={questions.length}
        />
      </div>
      <Button
        style={{height:'10%', width:'auto'}}
        onClick={() => {
          sortQuestions(getNewSortDirection("votes"), questions, "votes");
        }}
      >
        Popular {buttonAttributeDirecton("votes")}
      </Button>
      <Button
        style={{height:'10%', width:'auto'}}
        onClick={() => {
          sortQuestions(
            getNewSortDirection("timePosted"),
            questions,
            "timePosted"
          );
        }}
      >
        Most Recent {buttonAttributeDirecton("timePosted")}
      </Button>
      <UserPostContainer>
        {questions.map((item) => (
          <UserPost
            votes={item.votes}
            submitter={item.poster}
            text={item.text}
            id={item.id}
            key={item.id}
            timePosted={Number(item.timePosted)}
            incrementVote={incrementVote}
            decrementVote={decrementVote}
            hasUserVoted={hasUserVoted(item.id)}
            answer={item.answer}
          />
        ))}
      </UserPostContainer>
      </div>
    </Container>
  );
};

export default UserHome;
