import React, {useState}  from 'react';
import themes from './Themes'
import { Modal } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';


export default function QuestionModal(props) {

    const [questionText, setQuestionText] = React.useState("")
    const [user, setUser] = React.useState("Anonymous")

    function showSuccessfulToast () {
        toast.success('New Question Posted', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

        toast()
    }

    function submit(event){
        const data  = {
            id: "100",
            text: questionText,
            poster: user,
            votes: 0,
            timePosted: new Date()/1000,
            theme: "",
            answer: ""
        }
        props.data.push(data)
        props.switchModal()
        event.preventDefault()
        showSuccessfulToast()
    }
    function handleUser(event){
        let isChecked = event.target.checked
        if (isChecked) {
            setUser("Anonymous")
        }
        else {
            setUser('UserName')
        }

    }

    return (
        <Modal show={props.isModalOpen} onHide={props.switchModal} dialogClassName="submitQuestionModal">
          <Modal.Header closeButton>
              <Modal.Title>Submit Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={submit}>
            <textarea rows="4" className="submitQuestionForm" placeholder='Ask us anything...' onChange={(e) => setQuestionText(e.target.value)}/>
            <div>
                <input className="questionSubmitContainer" id="isAnonymous" type="checkbox" onChange={e => handleUser(e)} defaultChecked={true}/>
                <label for="isAnonymous">  Ask Anonymously</label>
                <input type="submit" value="Post Question"/>
            </div>
            </form>
          </Modal.Body>
        </Modal>
    );
}
