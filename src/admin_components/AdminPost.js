import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GoKebabHorizontal } from "react-icons/go";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import themes from './Themes'
import Button from '@material-ui/core/Button';
import AdminQuestionModal from './AdminQuestionModal';
import {AiFillCaretDown, AiFillCaretUp, AiFillEdit} from "react-icons/ai";
import {MdAddCircleOutline} from "react-icons/md";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "lightgrey",
    ...draggableStyle
  });

export default class AdminPost extends React.Component{

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
            theme: this.props.theme ? this.props.theme : "Select Theme",
            answer: this.props.answer,
        })
    }

    updateTheme(evt){
        this.setState({
            theme: evt
        })

        this.props.updateTheme(this.props.questionList, evt, this.props.dragId)
    }

    switchModal() {
        this.setState({
            isModalOpen: ! this.state.isModalOpen
        })
        //make this return a promise
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

    formatTime(timeInSeconds){
        //new Date()/1000
        const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
        const today = new Date()
        let posted = new Date(timeInSeconds *1000)
        const days = today.getUTCDate() - posted.getUTCDate()
        const hours = today.getUTCHours() - posted.getUTCHours()
        const minutes = today.getUTCMinutes() - posted.getUTCMinutes()
        const seconds = today.getUTCSeconds() - posted.getUTCSeconds()
        if (days >= 1){
            return rtf1.format(-days, 'days')
        }
        else if (hours >= 1){
            return rtf1.format(-hours, 'hours')
        }
        else if (minutes >= 1){
            return rtf1.format(-minutes, 'minutes')
        }
        else {
            return rtf1.format(-seconds, 'seconds')
        }
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
                            <p className="question">{this.props.text}</p>
                            <Button className="editButton" onClick={() => this.switchModal()}>{<MdAddCircleOutline size={30}/>}</Button>
                            <AdminQuestionModal isModalOpen={this.state.isModalOpen} addAnswer={this.addAnswer} answer={this.state.answer} switchModal={() => this.switchModal()}/>
                            <div className="textContainer">
                                <h5 className="textStyle">Votes: {this.props.votes} </h5>
                                <h5 className="textStyle">Asked By: {this.props.poster}</h5>
                                <h5 className="textStyle">Posted: {this.formatTime(this.props.timePosted)}</h5>
                                <Dropdown onSelect={this.updateTheme} title={<span>Dropdown</span>} className="dropdown">
                                <Dropdown.Toggle className="dropdown">
                                {this.state.theme}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown">
                                    {themes.map((item) => <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            {this.renderReply()}
                    </div>
                )}
            </Draggable>
        )
    }

}
