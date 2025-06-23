import React, { useEffect, useState } from 'react';
import newsData from '../data/news.json';

function News() {
  const [news, setNews] = useState([]);
      const session = sessionStorage.getItem('loggedInUser');
      if (!session) {
        window.location.href = '/';
      }
  useEffect(() => {
    setNews(newsData);
    const interval = setInterval(() => {
            window.location.reload();
        }, 600000);

        return () => clearInterval(interval); 
    }
  , []);
  

  

  return (
    <div className="container mt-4">
      <h2>Tech News</h2>
      <ul className="list-group">
        {news.map(item => (
          <li key={item.id} className="list-group-item">
            <a href={item.link}><h5>{item.title}</h5></a>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;