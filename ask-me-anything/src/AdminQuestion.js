import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function AdminQuestion(props){
    let provided = props.provided;
    let snapshot = props.snapshot;
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
                    <h1>{props.text}</h1>
                    <h2>{props.timePosted}</h2>
                    <h3>{props.votes}</h3>
                </div>
            )}
        </Draggable>
    )

}

export default AdminQuestion;