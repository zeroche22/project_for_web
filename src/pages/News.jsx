import React, { useEffect, useState } from 'react';
import newsData from '../data/news.json';

function News() {
  const [news, setNews] = useState([]);
  const session = sessionStorage.getItem('loggedInUser');

  if (!session) {
    window.location.href = '/';
  }

  useEffect(() => {
    const localNews = newsData.map((item) => ({
      ...item,
      source: 'local',
    }));
    setNews(localNews);

    const fetchExternalNews = () => {
      fetch('https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10', {
        headers: {
          'X-Api-Key': 'c9bbb3484f1942cb969b32a5097695b2',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.articles) {
            const externalNews = data.articles.map((item, index) => ({
              id: `api-${index}`,
              title: item.title,
              body: item.description,
              link: item.url,
              source: 'api',
            }));
            setNews((prev) => [...localNews, ...externalNews]);
          }
        })
        .catch((err) => console.error('News API error:', err));
    };

    fetchExternalNews();
    const interval = setInterval(fetchExternalNews, 600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Tech News</h2>
      <ul className="list-group">
        {news.map((item) => (
          <li key={item.id} className="list-group-item">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <h5>{item.title}</h5>
            </a>
            <p>{item.body}</p>
            <small className="text-muted">
              Source: {item.source === 'local' ? 'Local JSON' : 'NewsAPI.org'}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;
