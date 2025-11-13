import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: 'student',
    bio: '',
    skills: [],
    interests: [],
    education: {
      institution: '',
      degree: '',
      field: '',
      graduationYear: ''
    },
    career: {
      company: '',
      position: '',
      industry: '',
      experience: ''
    }
  });

  // Ensure profile data has all required nested objects
  const ensureProfileStructure = (userData) => {
    return {
      ...userData,
      skills: userData.skills || [],
      interests: userData.interests || [],
      education: {
        institution: '',
        degree: '',
        field: '',
        graduationYear: '',
        ...(userData.education || {})
      },
      career: {
        company: '',
        position: '',
        industry: '',
        experience: '',
        ...(userData.career || {})
      }
    };
  };
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skillsInput, setSkillsInput] = useState('');
  const [interestsInput, setInterestsInput] = useState('');

  useEffect(() => {
    if (user) {
      console.log('User data:', user);  // Debug log
      const structuredProfile = ensureProfileStructure(user);
      setProfile(structuredProfile);
      setSkillsInput(structuredProfile.skills.join(', '));
      setInterestsInput(structuredProfile.interests.join(', '));
    } else {
      console.log('No user data available');  // Debug log
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedChange = (e, section) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };

  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
  };

  const handleInterestsChange = (e) => {
    setInterestsInput(e.target.value);
  };

  const saveProfile = async () => {
    setLoading(true);
    // Convert comma-separated strings to arrays
    const skillsArray = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
    const interestsArray = interestsInput.split(',').map(interest => interest.trim()).filter(interest => interest);
    
    const updatedProfile = {
      ...profile,
      skills: skillsArray,
      interests: interestsArray
    };
    
    try {
      const res = await updateProfile(updatedProfile);
      if (res.success) {
        setEditing(false);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="profile">
        <div className="profile-header">
          <h1>Profile</h1>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile fade-in container">
      <div className="profile-header">
        <h1>Profile</h1>
        {editing ? (
          <div className="profile-actions">
            <button 
              className="btn btn-primary" 
              onClick={saveProfile}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            className="btn btn-primary" 
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label>Name</label>
            {editing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.name}</p>
            )}
          </div>
          
          <div className="form-group">
            <label>Email</label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>
          
          <div className="form-group">
            <label>Role</label>
            {editing ? (
              <select
                name="role"
                value={profile.role}
                onChange={handleInputChange}
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
              </select>
            ) : (
              <p>{profile.role === 'student' ? 'Student' : 'Alumni'}</p>
            )}
          </div>
          
          <div className="form-group">
            <label>Bio</label>
            {editing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                rows="4"
              />
            ) : (
              <p>{profile.bio || 'No bio provided'}</p>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>Skills & Interests</h2>
          <div className="form-group">
            <label>Skills</label>
            {editing ? (
              <input
                type="text"
                value={skillsInput}
                onChange={handleSkillsChange}
                placeholder="Enter skills separated by commas"
              />
            ) : (
              <div className="tags">
                {profile.skills && profile.skills.map((skill, index) => (
                  <span key={index} className="tag">{skill}</span>
                ))}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Interests</label>
            {editing ? (
              <input
                type="text"
                value={interestsInput}
                onChange={handleInterestsChange}
                placeholder="Enter interests separated by commas"
              />
            ) : (
              <div className="tags">
                {profile.interests && profile.interests.map((interest, index) => (
                  <span key={index} className="tag">{interest}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>Education</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Institution</label>
              {editing ? (
                <input
                  type="text"
                  name="institution"
                  value={profile.education.institution}
                  onChange={(e) => handleNestedChange(e, 'education')}
                />
              ) : (
                <p>{profile.education.institution || 'Not provided'}</p>
              )}
            </div>
            
            <div className="form-group">
              <label>Degree</label>
              {editing ? (
                <input
                  type="text"
                  name="degree"
                  value={profile.education.degree}
                  onChange={(e) => handleNestedChange(e, 'education')}
                />
              ) : (
                <p>{profile.education.degree || 'Not provided'}</p>
              )}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Field of Study</label>
              {editing ? (
                <input
                  type="text"
                  name="field"
                  value={profile.education.field}
                  onChange={(e) => handleNestedChange(e, 'education')}
                />
              ) : (
                <p>{profile.education.field || 'Not provided'}</p>
              )}
            </div>
            
            <div className="form-group">
              <label>Graduation Year</label>
              {editing ? (
                <input
                  type="text"
                  name="graduationYear"
                  value={profile.education.graduationYear}
                  onChange={(e) => handleNestedChange(e, 'education')}
                />
              ) : (
                <p>{profile.education.graduationYear || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Career Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Company</label>
              {editing ? (
                <input
                  type="text"
                  name="company"
                  value={profile.career.company}
                  onChange={(e) => handleNestedChange(e, 'career')}
                />
              ) : (
                <p>{profile.career.company || 'Not provided'}</p>
              )}
            </div>
            
            <div className="form-group">
              <label>Position</label>
              {editing ? (
                <input
                  type="text"
                  name="position"
                  value={profile.career.position}
                  onChange={(e) => handleNestedChange(e, 'career')}
                />
              ) : (
                <p>{profile.career.position || 'Not provided'}</p>
              )}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Industry</label>
              {editing ? (
                <input
                  type="text"
                  name="industry"
                  value={profile.career.industry}
                  onChange={(e) => handleNestedChange(e, 'career')}
                />
              ) : (
                <p>{profile.career.industry || 'Not provided'}</p>
              )}
            </div>
            
            <div className="form-group">
              <label>Years of Experience</label>
              {editing ? (
                <input
                  type="text"
                  name="experience"
                  value={profile.career.experience}
                  onChange={(e) => handleNestedChange(e, 'career')}
                />
              ) : (
                <p>{profile.career.experience || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>
  <aside className="profile-side">
          <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px'}}>
            <div className="avatar" style={{width:80, height:80, fontSize:24}}>
              {profile.name ? profile.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase() : 'U'}
            </div>
            <div>
              <h3 style={{margin:0}}>{profile.name || 'Unknown'}</h3>
              <p style={{margin:0, color:'#6c757d'}}>{profile.role}</p>
            </div>
          </div>

          <div style={{marginTop:10}}>
            <h4>Contact</h4>
            <p style={{color:'#6c757d'}}>{profile.email || 'Not provided'}</p>
          </div>

          <div style={{marginTop:20}}>
            <h4>Skills</h4>
            <div className="tags">
              {(profile.skills || []).map((s, i) => (
                <span key={i} className="tag" style={{marginRight:6}}>{s}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Profile;