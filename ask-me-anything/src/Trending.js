import React, { useEffect, useState } from "react";
import {getTableData} from './api';
import Post from './Post'
import "bootstrap/dist/css/bootstrap.css";

function Trending() {
  let [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(getTableData());
  }, []);

  function incrementVoteCount(questionId) {
    questions = questions.map((question) => {
      if (question.id === questionId) {
        question.votes = question.votes + 1;
      }
      return question;
    });
    setQuestions(questions);
  }

  return (
      <div>
        {questions.map((question) => {
          return (
                <Post votes={question.votes} poster={question.poster} text={question.text} key={question.id} incrementVote={(questionId) => incrementVoteCount(questionId)}/>
          );
        })}
        </div>
  );
}
export default Trending;