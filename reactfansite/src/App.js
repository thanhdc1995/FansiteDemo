import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://dev-api.share-gram.com/v2/demo-posts';
const TOKEN = 'LbTh1WmBCeJUYqXXKlEj9E0719yTzpLxl095j79M';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}?page=${page}&limit=5`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const data = response.data.data;
        setPosts(prevPosts => [...prevPosts, ...data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          {post.media_preview && (
            <>
              {(post.media_preview.type === 1) ? (              
                <img
                  src={`https://dev-api.share-gram.com/v2/resources/${post.media_preview.url}`}
                  alt="Media Preview"
                  style={{ width: '300px', height: 'auto' }}
                />
              ) : (
                <video
                  src={`https://dev-api.share-gram.com/v2/resources/${post.media_preview.url}`}
                  alt="Media Preview"
                  style={{ width: '300px', height: 'auto' }}
                  controls
                />
              )}
            </>
          )}
        </div>
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default App;
