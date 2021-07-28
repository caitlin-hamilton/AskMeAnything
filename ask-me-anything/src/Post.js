import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsFillCaretUpFill} from "react-icons/bs";
import './App.css'

// function Post(props) {
//     let {questionId , incrementVote} = props
//     return (
//         <div className="post">
//             <p>{props.text}</p>
//             <p>{props.poster}</p>
//             <BsFillCaretUpFill onClick={() => incrementVote(questionId)}/><p>{props.votes}</p>
//         </div>
//       );
//     }
// export default Post;

function Post(props) {
    return (
        <div className="post">
            <p>{props.text}</p>
            <p>{props.poster}</p>
            <BsFillCaretUpFill onClick={() => props.incrementVote(props.id)}/><p>{props.votes}</p>
        </div>
      );
    }
export default Post;
