import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Question from "../Question";
import { getUserName } from "../api";
import '../App.css'

interface Props {
  addNewQuestion(newQuestion: Question): any;
  isModalOpen: boolean;
  switchModal(): any;
  userId: string;
  numberOfQuestions: number
}

const initialState = {
  questionText: "",
  user: "Anonymous",
};

export default function QuestionModal(props: Props) {
  const [questionText, setQuestionText] = useState(initialState.questionText);
  const [user, setUser] = useState(initialState.user);

  function resetModal(){
    setQuestionText(initialState.questionText); //otherwise it remembers state from previous question
    setUser(initialState.user);
    props.switchModal();
  }

  function postNewQuestion(){
    const today: Date = new Date();
    const newQuestion: Question = {
      id: props.numberOfQuestions.toString() + 1, //obviously this is not ideal but fine for demo purposes
      text: questionText,
      poster: user,
      votes: 0,
      timePosted: Number(today),
      theme: "",
      answer: "",
    };
    props.addNewQuestion(newQuestion);
  }

  function submit(event: React.FormEvent) {
    postNewQuestion()
    resetModal()
    event.preventDefault();
  }

  function handleUser(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setUser("Anonymous");
    } else {
      setUser(getUserName(props.userId));
    }
  }

  return (
    <Modal
      show={props.isModalOpen}
      onHide={props.switchModal}
      dialogClassName="submitQuestionModal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Submit Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submit}>
          <textarea
            rows={4}
            style={{width: '100%'}}
            placeholder="Ask us anything..."
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
          <div>
            <input
              id="isAnonymous"
              type="checkbox"
              onChange={(e) => handleUser(e)}
              defaultChecked={true}
            />
            <label htmlFor="isAnonymous"> Ask Anonymously</label>
            <input type="submit" value="Post Question" style={{margin: "5px"}}/>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
