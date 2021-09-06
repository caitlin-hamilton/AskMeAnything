import React, {useState}  from 'react';
import themes from './Themes'
import { Modal } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

export default function QuestionModal(props) {

    function submit(){
        props.switchModal()
    }
    return (
        <Modal show={props.isModalOpen} onHide={props.switchModal} dialogClassName="submitQuestionModal">
          <Modal.Header closeButton>
              <Modal.Title>Submit Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={submit}>
            <textarea rows="4" className="submitQuestionForm" placeholder='Ask us anything...'/>
            <div>
                <input className="questionSubmitContainer" id="isAnonymous" type="checkbox"/>
                <label for="isAnonymous">  Ask Anonymously</label>
                <input type="submit" value="Post Question"/>
            </div>
            </form>
          </Modal.Body>
        </Modal>
    );
}
