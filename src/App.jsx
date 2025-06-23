import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import News from './pages/News';
import Quizzes from './pages/Quizzes';
import QuizDetail from './pages/QuizDetail';
import QuizResult from './pages/QuizResult';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/quizzes" element={< Quizzes/>} />
        <Route path="/quizzes/:id" element={<QuizDetail />} />
        <Route path="/quizzes/:id/result" element={<QuizResult />} />
      </Routes>
    </>
  );
}

export default App;
