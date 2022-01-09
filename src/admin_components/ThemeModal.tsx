import React, {useState}  from 'react';
import themes from './Themes'
import { Modal } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

interface Props {
    switchModal(): void;
    themes: Array<string>;
    showSuccessfulToast(): void;
    isModalOpen: boolean
    
}

export default function ThemeModal(props: Props): JSX.Element {

    const [theme, updateTheme] = useState('')
    function updateThemeForm(event: React.ChangeEvent<HTMLInputElement>) {
        updateTheme(event.target.value)
    }

    function submit(event: React.FormEvent){
        props.switchModal()
        event.preventDefault()
        props.themes.push(theme)
        props.showSuccessfulToast()
    }

    function deleteTheme(event: React.MouseEvent<Element, MouseEvent>){
        console.log(event)
        // const index = themes.indexOf(event.target);
        // if (index > -1) {
        //     themes.splice(index, 1);
        // }
    }

    return (
        <Modal show={props.isModalOpen} onHide={props.switchModal}>
          <Modal.Header closeButton>
              <Modal.Title>Edit Themes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={submit}>
                <input onChange={updateThemeForm} placeholder='Add new theme' maxLength={12}/>
                <input type="submit" value="Submit"/>
            </form>
            <div style={{height:'25px'}}></div>
            <div className="buttonContainerDelete">
            {themes.map((item) => (
                <Button
                    key={item}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    value={item}
                    onClick={e => deleteTheme(e)}
                    >
                {item}
                </Button>
                ))}
            </div>
          </Modal.Body>
        </Modal>
    );
}
