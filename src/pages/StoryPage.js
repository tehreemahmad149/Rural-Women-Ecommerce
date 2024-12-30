import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/StoryPage.css';

// StoryPage component to show the user's story
function StoryPage() {
  const { productId } = useParams(); 
  const [story, setStory] = useState(null);
  const [entrepreneurName, setEntrepreneurName] = useState('');

  useEffect(() => {
    // Fetch the entrepreneur's story using the productId
    axios.get(`http://localhost:5000/api/products/story/${productId}`)
      .then(response => {
        console.log("response recieved from server");
        console.log(response.data);
        setStory(response.data.data.story);
        setEntrepreneurName(response.data.data.name);
      })
      .catch(error => console.log(error));
  }, [productId]);

  return (
    <div className="story-page">
        <div className="story-container">
          <h2>{entrepreneurName}'s Story</h2>
          <p>{story}</p>
        </div>
    </div>
  );
}

export default StoryPage;
