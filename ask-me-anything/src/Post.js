import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsFillCaretUpFill} from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa";
import './App.css'

function Post(props) {
    return (
        <div className="userPost">
            <p className="userQuestion">{props.text}</p>
            <p className="askedBy">Asked By: {props.poster}</p>
            <div className="likeContainer">
                <p className="voteP">{props.votes}</p>
                <FaThumbsUp onClick={() => props.incrementVote(props.id)}/>
            </div>
        </div>
      );
    }
export default Post;
