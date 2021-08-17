import React, {useState}  from 'react';
import themes from './Themes'
import { Modal } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';


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
            <form onSubmit={submit}>
                <input onChange={updateThemeForm} placeholder='Add new theme'/>
                <input type="submit" value="Submit"/>
            </form>
            <div style={{height:'25px'}}></div>
            <div className="buttonContainerDelete">
            {themes.map((item) => (
                <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    >
                {item}
                </Button>
                ))}
            </div>
          </Modal.Body>
        </Modal>
    );
}
