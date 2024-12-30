import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/MentorsPage.css';

function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [expandedMentor, setExpandedMentor] = useState(null);

  // Fetch all mentors on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/mentors')
      .then(response => {
        setMentors(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const toggleDropdown = (mentorId) => {
    // Toggle between expanding and collapsing the current mentor
    setExpandedMentor(mentorId === expandedMentor ? null : mentorId);
  };

  return (
    <div className="mentors-page">
      <h1>Mentors</h1>
      {mentors.length === 0 ? (
        <p>Loading mentors...</p>
      ) : (
        <div className="mentors-grid">
          {mentors.map((mentor) => (
            <div key={mentor._id} className="mentor-card">
              <div className="mentor-header">
                <img
                  src={mentor.profilePicture}
                  alt={`${mentor.name}'s profile`}
                  className="mentor-profile-picture"
                />
                <div className="mentor-details">
                  <h2>{mentor.name}</h2>
                  <p>{mentor.description}</p>
                  <a href={mentor.linkedinLink} target="_blank" rel="noopener noreferrer">
                    LinkedIn Profile
                  </a>
                </div>
                <button
                  className="toggle-dropdown-button"
                  onClick={() => toggleDropdown(mentor._id)}
                >
                  {expandedMentor === mentor._id ? 'Hide Courses' : 'Show Courses'}
                </button>
              </div>
              {expandedMentor === mentor._id && (
                <div className="mentor-courses expanded">
                  <h3>Courses:</h3>
                  <ul>
                    {mentor.courses.map((course, index) => (
                      <li key={index}>
                        <a href={course.link} target="_blank" rel="noopener noreferrer">
                          {course.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MentorsPage;
