import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsFillCaretUpFill} from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa";
import {ImReply} from "react-icons/im";
import './App.css'

class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text: "",
            answer : "",
            hasAnswer: false,
            poster : "",
            votes: "",
            id: ""
        }

    }
    componentDidMount(){
        this.setState({
            text: this.props.text,
            answer : this.props.answer,
            hasAnswer: this.props.answer == "" ? false : true,
            poster : this.props.poster,
            votes: this.props.votes,
            id: this.props.id
        })
    }

    renderAnswer(){
        return
    }

    renderReply(){
        if (this.state.hasAnswer){
            return (
            <div>
                <ImReply onClick="renderAnswer()"/>
                <p>{this.state.answer}</p>
            </div>
            )
        }
    }
    render(){
    return (
        <div className="userPost">
            <p className="userQuestion">{this.state.text}</p>
            <p className="askedBy">Asked By: {this.state.poster}</p>
            <div className="likeContainer">
                <p className="voteP">{this.state.votes}</p>
                <FaThumbsUp onClick={() => this.state.incrementVote(this.state.id)}/>
            </div>
            {this.renderReply()}
        </div>
      );
    }
}
export default Post;
