import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Nav from './components/Nav.jsx';
import Cards from './components/Cards.jsx';

function App() {
  const [post, setPost] = useState([]);
  const key = process.env.REACT_APP_API_KEY;
  
  useEffect(() => {
    axios
      .get(`https://dummyapi.io/data/v1/post`, {
          headers: {
            "app-id": key
          }
        }
      )
      .then(response => {
        const data = response.data.data
        setPost(data)
      }).catch(console.log)
  }, [])
    
    function onSearch(tag) {
        const filter = post.filter(p => p.tags.includes(tag));
        setPost(filter);
    }
    
    return (
        <div className='app'>
            <Nav onSearch={onSearch}/>
            <hr />
            <Cards post={post} />
        </div>
    );
}

export default App;
