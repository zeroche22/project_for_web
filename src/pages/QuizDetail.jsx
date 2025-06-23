import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizzesData from '../data/quizzes.json';

function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
      const session = sessionStorage.getItem('loggedInUser');
      if (!session) {
        window.location.href = '/';
      }
    setLoading(true);
    setError(null);

    const quizIdNum = parseInt(id);
    const foundQuiz = quizzesData.find((q) => q.id === quizIdNum);

    if (foundQuiz) {
      setQuiz(foundQuiz);
      setLoading(false);
    } else {
      setError('Quiz not found. Please check the URL.');
      setLoading(false);
    }
    const interval = setInterval(() => {
            window.location.reload();
        }, 600000);

        return () => clearInterval(interval); 
    
  }, [id]);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionIndex
    }));
  };

  const handleSubmit = () => {
    navigate(`/quizzes/${id}/result`, { state: { quiz, answers } });
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading quiz details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center text-danger">
        <h2>Error: {error}</h2>
        <p>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/quizzes')}>
            Go to Quizzes List
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 quiz-detail-card">

        <h1 className="card-title display-5 text-primary fw-bold">{quiz.title}</h1>
        <p className="card-text lead mt-3">{quiz.description}</p>
        <hr className="my-4" />

        <h3 className="mb-3">Answer the following questions:</h3>
        <ul className="list-group list-group-flush mb-4">
          {quiz.questions.map((q, index) => (
            <li key={index} className="list-group-item">
              <h5 className="mb-3">Q{index + 1}: {q.question}</h5>
              <div className="d-flex flex-column">
                {q.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="mb-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={optionIndex}
                      checked={answers[index] === optionIndex}
                      onChange={() => handleOptionSelect(index, optionIndex)}
                      className="form-check-input me-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="d-flex justify-content-center flex-wrap gap-3">
          <button className="btn btn-success btn-lg" onClick={handleSubmit}>
            Submit Quiz
          </button>
          <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/quizzes')}>
            Back to Quizzes
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizDetail;