import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsFillCaretUpFill} from "react-icons/bs";
import './App.css'

// function Post(props) {
//     let [count, incrementVote] = useState(props.vote)
//     let {votes, questionId, updateVotes} = props; 
//     useEffect(() => {
//         incrementVote(votes);
//     }, [votes])
//     return (
//         <div className="post">
//             <BsFillCaretUpFill onClick={() => incrementVote(count + 1), () => updateVotes(questionId, votes)}/><p>{count}</p>
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
