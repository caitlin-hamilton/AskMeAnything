import React, {useState}  from 'react';
import { Modal } from 'react-bootstrap';
import Question from './Question'

interface Props {
    addNewQuestion(newQuestion: Question): any;
    isModalOpen: boolean;
    switchModal(): any

}

export default function QuestionModal(props: Props) {

    const [questionText, setQuestionText] = useState("")
    const [user, setUser] = useState("Anonymous")

    function submit(event: React.FormEvent){
        const today: Date = new Date()
        const newQuestion: Question  = {
            id: Math.random(),  //obviously this is not ideal but fine for demo purposes
            text: questionText,
            poster: user,
            votes: 0,
            timePosted: Number(today)/1000,
            theme: "",
            answer: ""
        }
        props.addNewQuestion(newQuestion)
        props.switchModal()
        event.preventDefault()
    }
    function handleUser(event: React.ChangeEvent<HTMLInputElement>){
        let isChecked = event.target.checked
        if (isChecked) {
            setUser("Anonymous")
        }
        else {
            setUser('Caitlin Hamilton')
        }

    }

    return (
        <Modal show={props.isModalOpen} onHide={props.switchModal} dialogClassName="submitQuestionModal">
          <Modal.Header closeButton>
              <Modal.Title>Submit Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={submit}>
            <textarea rows={4} className="submitQuestionForm" placeholder='Ask us anything...' onChange={(e) => setQuestionText(e.target.value)} required/>
            <div>
                <input className="questionSubmitContainer" id="isAnonymous" type="checkbox" onChange={e => handleUser(e)} defaultChecked={true}/>
                <label htmlFor="isAnonymous">  Ask Anonymously</label>
                <input type="submit" value="Post Question"/>
            </div>
            </form>
          </Modal.Body>
        </Modal>
    );
}
