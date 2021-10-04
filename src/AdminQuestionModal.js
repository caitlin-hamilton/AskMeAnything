import React, {useState}  from 'react';
import { Modal } from 'react-bootstrap';

export default function AdminQuestionModal(props) {

    const [answer, setAnswer] = useState(props.answerText);

    function submit(event){
        props.addAnswer(answer)
        props.switchModal()
        event.preventDefault()
    }

    return (
        <Modal show={props.isModalOpen} onHide={props.switchModal}>
          <Modal.Header closeButton>
              <Modal.Title>Add Answer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={submit}>
                <textarea placeholder="Add answer here..." onChange={e => setAnswer(e.target.value)} className="submitQuestionText">{(props.answer) ? props.answer : ''}</textarea>
                <input type="submit" value="Submit"/>
            </form>
            <div style={{height:'25px'}}></div>
          </Modal.Body>
        </Modal>
    );
}
