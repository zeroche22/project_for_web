import React, { useState, useEffect } from 'react';

function Home() {
      const session = sessionStorage.getItem('loggedInUser');
      if (!session) {
        window.location.href = '/';
      }
      useEffect(() => {
        const interval = setInterval(() => {
        window.location.reload();        
}, 600000);

        return () => clearInterval(interval); 


    }, []);
  return (
    <div className="container mt-5">

      <div className="text-center mb-5 home-welcome-section">
        <h1 className="display-4 fw-bold">
          Welcome to <span className="text-primary">Tech World</span>
        </h1>
        <p className="lead mt-3">
          Explore quizzes, tech news, and improve your skills with us!
        </p>
      </div>


      <div className="mt-5 text-center home-cta-section">
        <h2 className="mb-3">Stay Updated</h2>
        <p className="mb-4">
          Check out the latest updates and exciting news in our News section.
        </p>
        <a href="/news" className="btn btn-primary btn-lg">
          Go to News
        </a>
      </div>
    </div>
  );
}

export default Home;