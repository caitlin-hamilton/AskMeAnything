import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GoKebabHorizontal } from "react-icons/go";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import themes from './Themes'
import Button from '@material-ui/core/Button';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "lightgrey",
    ...draggableStyle
  });

function AdminQuestion(props){
    var questionTheme

    function setDefaultTheme(){
        if(props.theme === ""){
            questionTheme = 'Select Theme'
        }
        else {
            questionTheme = props.theme
        }
        return questionTheme
    }

    function updateTheme(evt){
        questionTheme = evt
        props.updateTheme(questionTheme, props.dragId)
    }
    return (
        <Draggable
            key={props.dragId}
            draggableId={props.dragId}
            index={props.index}>
            {(provided, snapshot) => (
                <div className="adminPost"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}>
                        <p className="question">{props.text}</p>
                        <Button className="editButton">{<GoKebabHorizontal/>}</Button>
                        <h5 className="textStyle">Votes: {props.votes} </h5>
                        <Dropdown onSelect={updateTheme} className="dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown">
                                {setDefaultTheme()}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {themes.map((item) => <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                </div>
            )}
        </Draggable>
    )

}

export default AdminQuestion;