import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/TutorialsPage.css'; // Updated styling

function TutorialsPage() {
  const [tutorials, setTutorials] = useState([]); // To store all tutorial titles
  const [selectedTutorial, setSelectedTutorial] = useState(null); // To store the title of the selected tutorial
  const [links, setLinks] = useState([]); // To store the links for the selected tutorial

  // Fetch all tutorial titles on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/tutorials')
      .then(response => {
        setTutorials(response.data); // Assuming response is an array of tutorials
      })
      .catch(error => console.log(error));
  }, []);

  // Fetch links for the selected tutorial
  const fetchLinks = (title) => {
    if (selectedTutorial === title) {
      // If already selected, close it
      setSelectedTutorial(null);
      setLinks([]);
    } else {
      // Fetch links for the selected tutorial
      axios.get(`http://localhost:5000/api/tutorials/${title}`)
        .then(response => {
          setSelectedTutorial(title);
          setLinks(response.data); // Assuming response is an array of links
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="tutorials-page">
      <h1>Tutorials</h1>
      {tutorials.length === 0 ? (
        <p>Loading tutorials...</p>
      ) : (
        <ul className="tutorials-list">
          {tutorials.map((tutorial, index) => (
            <li key={index} className="tutorial-item">
              <button
                onClick={() => fetchLinks(tutorial.title)}
                className={`tutorial-button ${selectedTutorial === tutorial.title ? 'active' : ''}`}
              >
                {tutorial.title}
              </button>
              <ul className={`links-list ${selectedTutorial === tutorial.title ? 'active' : ''}`}>
                {selectedTutorial === tutorial.title &&
                  links.map((link, idx) => (
                    <li key={idx} className="link-item">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TutorialsPage;
