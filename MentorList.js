import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching mentors
    setTimeout(() => {
      setMentors([
        {
          id: 1,
          name: 'Jane Smith',
          position: 'Senior Software Engineer',
          company: 'Tech Corp',
          skills: ['JavaScript', 'React', 'Node.js'],
          interests: ['Web Development', 'Mentoring'],
          bio: 'Passionate about helping students grow in their tech careers.'
        },
        {
          id: 2,
          name: 'Michael Johnson',
          position: 'Product Manager',
          company: 'Innovate Inc',
          skills: ['Product Strategy', 'Agile', 'UX Design'],
          interests: ['Product Management', 'Startup Culture'],
          bio: 'Experienced product leader with a passion for innovation.'
        },
        {
          id: 3,
          name: 'Sarah Williams',
          position: 'Data Scientist',
          company: 'Data Insights Co',
          skills: ['Python', 'Machine Learning', 'Statistics'],
          interests: ['Data Science', 'AI Ethics'],
          bio: 'Dedicated to advancing the field of data science and mentoring the next generation.'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    mentor.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const requestMentorship = (mentorId) => {
    // In a real app, this would make an API call
    alert(`Mentorship request sent to mentor ${mentorId}!`);
  };

  if (loading) {
    return <div className="mentor-list">Loading mentors...</div>;
  }

  return (
    <div className="mentor-list">
      <div className="mentor-list-header">
        <h1>Find Mentors</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search mentors by name, skills, or interests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="mentors-grid">
        {filteredMentors.length > 0 ? (
          filteredMentors.map(mentor => (
            <div key={mentor.id} className="mentor-card">
              <div className="mentor-info">
                <h3>{mentor.name}</h3>
                <p className="mentor-position">{mentor.position} at {mentor.company}</p>
                <p className="mentor-bio">{mentor.bio}</p>
                
                <div className="mentor-skills">
                  <h4>Skills</h4>
                  <div className="tags">
                    {mentor.skills.map((skill, index) => (
                      <span key={index} className="tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="mentor-interests">
                  <h4>Interests</h4>
                  <div className="tags">
                    {mentor.interests.map((interest, index) => (
                      <span key={index} className="tag">{interest}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mentor-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => requestMentorship(mentor.id)}
                >
                  Request Mentorship
                </button>
                <Link to={`/mentor/${mentor.id}`} className="btn btn-outline">
                  View Profile
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No mentors found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorList;