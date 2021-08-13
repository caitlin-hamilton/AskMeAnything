import React, {useState}  from 'react';
import themes from './themes.json'
import { Modal } from 'react-bootstrap';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'grid',
  },
};


export default function ThemeModal(props) {
    const [theme, updateTheme] = useState("");

    function updateThemeForm(event) {
    updateTheme(event.target.value)
    }

    function submit(){
        themes.push(theme)
        console.log(themes)
        props.switchModal()
    }
    return (
        <Modal show={props.isModalOpen} onHide={props.switchModal}>
          <Modal.Header closeButton>
              <Modal.Title>Edit Themes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Add a New Theme</h3>
            <form onSubmit={submit}>
                <input onChange={updateThemeForm}/>
                <input type="submit" value="Submit"/>
            </form>
          </Modal.Body>
        </Modal>
    );
}
