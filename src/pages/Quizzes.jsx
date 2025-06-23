import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import quizzesData from '../data/quizzes.json'; 


function Quizzes() {
  
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
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          Our <span className="text-primary">Quizzes</span>
        </h1>
        <p className="lead mt-3">
          Test your knowledge with our quizzes on various tech topics!
        </p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {quizzesData.map((quiz) => (
          <div className="col" key={quiz.id}>
            <Link to={`/quizzes/${quiz.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm border-0 quiz-card">
                {quiz.image && (
                  <img
                    src={quiz.image}
                    className="card-img-top quiz-image"
                    alt={quiz.title}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-bold">
                    {quiz.title}
                  </h5>
                  <p className="card-text text-muted">{quiz.description}</p>
                  <div className="mt-auto">
                    <button className="btn btn-outline-primary btn-sm stretched-link">
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Quizzes;