import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GoKebabHorizontal } from "react-icons/go";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import {themes} from './Themes'
import Button from '@material-ui/core/Button';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
  });

function AdminQuestion(props){
    let provided = props.provided;
    let snapshot = props.snapshot;
    let [selectedTheme, setTheme] = useState('Select Theme')
    return (
        <Draggable
            key={props.dragId}
            draggableId={props.dragId}
            index={props.index}>
            {(provided, snapshot) => (
                <div className="post"
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
                        <Dropdown onSelect={function(evt){setTheme(selectedTheme = evt)}} className="dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {selectedTheme}
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