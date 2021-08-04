import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GoKebabHorizontal } from "react-icons/go";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import {themes} from './Themes'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 600,
      height: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  


function AdminQuestion(props){
    let provided = props.provided;
    let snapshot = props.snapshot;
    let [selectedTheme, setTheme] = useState('Select Theme')
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2>Add Answer</h2>
        <input></input>
        <button>S</button>
      </div>
    );
    return (
        <Draggable
            key={props.dragId}
            draggableId={props.dragId}
            index={props.index}>
            {(provided, snapshot) => (
                <div className="post"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                        <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
                        <Button onClick={()=> console.log('I am button')}>{<GoKebabHorizontal/>}</Button>
                        <Dropdown onSelect={function(evt){setTheme(selectedTheme = evt)}}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {selectedTheme}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {themes.map((item) => <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    <h1>{props.text}</h1>
                    <h3>{props.votes}</h3>
                </div>
            )}
        </Draggable>
    )

}

export default AdminQuestion;