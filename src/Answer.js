import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsFillCaretUpFill} from "react-icons/bs";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import {ImReply} from "react-icons/im";
import './App.css'

export default class Answer extends React.Component {
    constructor(props){
        super()
        this.state ={
            answerText : ""
            }
    }
    componentDidMount(){
        this.setState({
            answer : this.props.answer
        })
    }

render() {
    return (
        <div>
            <ImReply onClick="renderAnswer()"/>
            <p>{this.state.answer}</p>
            <FaThumbsUp onClick={() => this.state.incrementVote(this.state.id)}/>
            <FaThumbsDown onClick={() => this.state.incrementVote(this.state.id)}/>
            </div>
    )}
}