import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function QuizResult() {

  const location = useLocation();
  const navigate = useNavigate();
  const { quiz, answers } = location.state || {};

  if (!quiz || !answers) {
    return (
      <div className="container mt-5 text-center">
        <h2>Invalid Access</h2>
        <p>It seems you landed here incorrectly.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/quizzes')}>
          Go to Quizzes List
        </button>
      </div>
    );
  }

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });
    return score;
  };
  useEffect(() => {
        const session = sessionStorage.getItem('loggedInUser');
      if (!session) {
        window.location.href = '/';
      }
          const interval = setInterval(() => {
              window.location.reload();
          }, 600000);

          return () => clearInterval(interval); 
      }, []);
  const score = calculateScore();

  return (
    <div className="container mt-5 text-center">
      <div className="card p-4 shadow-lg">
        <h1 className="mb-4">Quiz Results: {quiz.title}</h1>
        <h2 className="text-success mb-4">Your Score: {score} / {quiz.questions.length}</h2>

        <ul className="list-group mb-4">
          {quiz.questions.map((q, index) => (
            <li key={index} className="list-group-item text-start">
              <strong>Q{index + 1}: {q.question}</strong>
              <br />
              Your Answer: <span className={answers[index] === q.answer ? 'text-success' : 'text-danger'}>
                {q.options[answers[index]] || 'No Answer'}
              </span>
              <br />
              Correct Answer: <span className="text-primary">{q.options[q.answer]}</span>
            </li>
          ))}
        </ul>

        <button className="btn btn-primary btn-lg" onClick={() => navigate('/quizzes')}>
          Back to Quizzes
        </button>
      </div>
    </div>
  );
}

export default QuizResult;