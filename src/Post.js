import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaThumbsUp, FaRegThumbsUp} from "react-icons/fa";
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
            id: "",
            hasUserVoted: false,
        }

    }
    componentDidMount(){
        this.setState({
            text: this.props.text,
            answer : this.props.answer,
            hasAnswer: this.props.answer === "" ? false : true,
            poster : this.props.poster,
            votes: this.props.votes,
            id: this.props.id,
            hasUserVoted: this.props.hasUserVoted,
            showAnswer: false
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.votes !== this.props.votes) {
            this.setState({
                votes: this.props.votes
            })

        }
    }

    toggleAnswer(){
        this.setState({
            showAnswer: !this.state.showAnswer
        })
    }

    renderReply(){
        if (this.state.hasAnswer && this.state.showAnswer){
            return (
                <p>{this.state.answer}</p>
            )
        }
    }
    
    renderVoteButton() {
        if (this.props.hasUserVoted === true){
            return <FaThumbsUp onClick={() => this.props.decrementVote(this.props.id)}/>
        }
        else
        {
            return <FaRegThumbsUp onClick={() => this.props.incrementVote(this.props.id)}/>
        }
    }
    render(){
    return (
        <div className="userPost">
            <p className="userQuestion">{this.state.text}</p>
            <p className="askedBy">Asked By: {this.state.poster}</p>
            <div className="likeContainer">
                <p className="voteP">{this.state.votes}</p>
                {this.renderVoteButton()}
            </div>
            <div className="answerDiv">
                <ImReply onClick={() => this.toggleAnswer()}/>
                {this.renderReply()}
            </div>
        </div>
      );
    }
}
export default Post;
