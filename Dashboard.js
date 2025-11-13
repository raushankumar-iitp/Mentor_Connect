import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser({
        name: 'John Doe',
        role: 'student',
        email: 'john@example.com'
      });
      
      // Simulate fetching mentorships
      setMentorships([
        {
          id: 1,
          mentor: { name: 'Jane Smith', position: 'Senior Software Engineer' },
          status: 'active',
          startDate: '2023-01-15'
        },
        {
          id: 2,
          mentor: { name: 'Mike Johnson', position: 'Product Manager' },
          status: 'pending',
          startDate: null
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}!</span>
          <Link to="/profile" className="btn btn-outline">Profile</Link>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Mentorships</h3>
            <p className="stat-value">{mentorships.length}</p>
          </div>
          <div className="stat-card">
            <h3>Active</h3>
            <p className="stat-value">
              {mentorships.filter(m => m.status === 'active').length}
            </p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-value">
              {mentorships.filter(m => m.status === 'pending').length}
            </p>
          </div>
        </div>

        <div className="mentorships-section">
          <div className="section-header">
            <h2>Your Mentorships</h2>
            {user?.role === 'student' && (
              <Link to="/mentors" className="btn btn-primary">Find Mentors</Link>
            )}
          </div>

          {mentorships.length > 0 ? (
            <div className="mentorship-list">
              {mentorships.map(mentorship => (
                <div key={mentorship.id} className="mentorship-card">
                  <div className="mentorship-info">
                    <h3>{mentorship.mentor.name}</h3>
                    <p>{mentorship.mentor.position}</p>
                    <div className="mentorship-status status-{mentorship.status}">
                      {mentorship.status}
                    </div>
                  </div>
                  <div className="mentorship-actions">
                    <Link to={`/mentorship/${mentorship.id}`} className="btn btn-outline">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You don't have any mentorships yet.</p>
              {user?.role === 'student' && (
                <Link to="/mentors" className="btn btn-primary">Find a Mentor</Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;