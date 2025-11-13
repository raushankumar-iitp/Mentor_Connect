import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Mentorship = () => {
  const { id } = useParams();
  const [mentorship, setMentorship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [newGoal, setNewGoal] = useState({ title: '', description: '', targetDate: '' });

  useEffect(() => {
    // Simulate fetching mentorship data
    setTimeout(() => {
      setMentorship({
        id: id,
        student: { name: 'John Doe', email: 'john@example.com' },
        mentor: { name: 'Jane Smith', email: 'jane@example.com', position: 'Senior Software Engineer' },
        status: 'active',
        startDate: '2023-01-15',
        goals: [
          {
            id: 1,
            title: 'Learn React Hooks',
            description: 'Master React Hooks including useState, useEffect, and custom hooks',
            targetDate: '2023-03-31',
            completed: true,
            completedDate: '2023-03-15'
          },
          {
            id: 2,
            title: 'Build a Full-Stack Project',
            description: 'Create a complete MERN stack application',
            targetDate: '2023-06-30',
            completed: false
          }
        ],
        messages: [
          {
            id: 1,
            sender: { name: 'Jane Smith' },
            content: 'Hi John, how is your React learning going?',
            timestamp: '2023-02-15T10:30:00Z'
          },
          {
            id: 2,
            sender: { name: 'John Doe' },
            content: 'It\'s going well! I\'ve been working on the project you suggested.',
            timestamp: '2023-02-15T11:45:00Z'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Simulate sending message
    const message = {
      id: mentorship.messages.length + 1,
      sender: { name: 'Current User' },
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setMentorship(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
    
    setNewMessage('');
  };

  const addGoal = () => {
    if (newGoal.title.trim() === '') return;
    
    // Simulate adding goal
    const goal = {
      id: mentorship.goals.length + 1,
      ...newGoal,
      completed: false
    };
    
    setMentorship(prev => ({
      ...prev,
      goals: [...prev.goals, goal]
    }));
    
    setNewGoal({ title: '', description: '', targetDate: '' });
  };

  if (loading) {
    return <div className="mentorship">Loading...</div>;
  }

  return (
    <div className="mentorship">
      <header className="mentorship-header">
        <h1>Mentorship with {mentorship.mentor.name}</h1>
        <div className="mentorship-status status-{mentorship.status}">
          {mentorship.status}
        </div>
      </header>

      <div className="mentorship-content">
        <div className="mentorship-info">
          <div className="info-card">
            <h3>Mentor</h3>
            <p>{mentorship.mentor.name}</p>
            <p>{mentorship.mentor.position}</p>
          </div>
          
          <div className="info-card">
            <h3>Student</h3>
            <p>{mentorship.student.name}</p>
          </div>
          
          <div className="info-card">
            <h3>Start Date</h3>
            <p>{mentorship.startDate}</p>
          </div>
        </div>

        <div className="goals-section">
          <div className="section-header">
            <h2>Goals</h2>
            <button className="btn btn-primary" onClick={addGoal}>Add Goal</button>
          </div>
          
          <div className="goal-form">
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                placeholder="Goal description"
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                rows="2"
              />
            </div>
          </div>
          
          <div className="goals-list">
            {mentorship.goals.map(goal => (
              <div key={goal.id} className={`goal-card ${goal.completed ? 'completed' : ''}`}>
                <div className="goal-header">
                  <h3>{goal.title}</h3>
                  <div className="goal-status">
                    {goal.completed ? 'Completed' : 'In Progress'}
                  </div>
                </div>
                <p>{goal.description}</p>
                <div className="goal-meta">
                  <span>Target: {goal.targetDate}</span>
                  {goal.completed && <span>Completed: {goal.completedDate}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="messages-section">
          <div className="section-header">
            <h2>Messages</h2>
          </div>
          
          <div className="messages-list">
            {mentorship.messages.map(message => (
              <div key={message.id} className="message-card">
                <div className="message-header">
                  <strong>{message.sender.name}</strong>
                  <span className="message-time">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          
          <div className="message-form">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              rows="3"
            />
            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;