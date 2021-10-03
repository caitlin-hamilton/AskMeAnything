import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GoKebabHorizontal } from "react-icons/go";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import themes from './Themes'
import Button from '@material-ui/core/Button';
import AdminQuestionModal from './AdminQuestionModal';
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "lightgrey",
    ...draggableStyle
  });

export default class AdminQuestion extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            theme: "Select Theme",
            isModalOpen: false,
            answer: "",
            showAnswer: false
        }
        this.updateTheme = this.updateTheme.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
    }

    componentDidMount(){
        this.setState({
            theme: "Select Theme",
            answer: this.props.answer,

        })
    }

    updateTheme(evt){
        this.setState({
            theme: evt
        })
    }

    switchModal() {
        this.setState({
            isModalOpen: ! this.state.isModalOpen
        })
    }

    switchShowAnswer(){
        this.setState({
            showAnswer: ! this.state.showAnswer
        })
    }


    renderReply(){
        if (this.state.answer != ""){
            return (
            <div className="answerContainer">
                <Button onClick= {() => this.switchShowAnswer()}> { this.state.showAnswer ? <AiFillCaretUp/> : <AiFillCaretDown/>} Show Answer</Button>
                {this.state.showAnswer ? <p>{this.state.answer}</p> : <p></p>}
            </div>
            )
        }
    } 

    addAnswer(answer){
        this.setState({
            answer: answer
        })
    }

    render() {
        return (
            <Draggable
                key={this.props.dragId}
                draggableId={this.props.dragId}
                index={this.props.index}>
                {(provided, snapshot) => (
                    <div className="adminPost"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}>
                            <Button className="editButton" onClick={() => this.switchModal()}>{<GoKebabHorizontal/>}</Button>
                            <p className="question">{this.props.text}</p>
                            <AdminQuestionModal isModalOpen={this.state.isModalOpen} addAnswer={this.addAnswer} answer={this.state.answer} switchModal={() => this.switchModal()}/>
                            <h5 className="textStyle">Votes: {this.props.votes} </h5>
                            <Dropdown onSelect={this.updateTheme} title={<span>Dropdown</span>} className="dropdown">
                                <Dropdown.Toggle className="dropdown">
                                {this.state.theme}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown">
                                    {themes.map((item) => <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                            {this.renderReply()}
                    </div>
                )}
            </Draggable>
        )
    }

}
