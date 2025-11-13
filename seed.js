const mongoose = require('mongoose');
const User = require('./models/User');
const Mentorship = require('./models/Mentorship');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mentorconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.log(err));

// Sample data
const users = [
  {
    name: 'John Student',
    email: 'john@student.com',
    password: 'student123',
    role: 'student',
    bio: 'Computer Science student passionate about web development',
    skills: ['JavaScript', 'React', 'Node.js'],
    interests: ['Web Development', 'Open Source'],
    education: {
      institution: 'University of Technology',
      degree: 'BSc',
      field: 'Computer Science',
      graduationYear: 2024
    }
  },
  {
    name: 'Jane Alumni',
    email: 'jane@alumni.com',
    password: 'alumni123',
    role: 'alumni',
    bio: 'Senior Software Engineer with 8 years of experience',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    interests: ['Mentoring', 'Web Development'],
    education: {
      institution: 'University of Technology',
      degree: 'BSc',
      field: 'Computer Science',
      graduationYear: 2016
    },
    career: {
      company: 'Tech Solutions Inc.',
      position: 'Senior Software Engineer',
      industry: 'Technology',
      experience: 8
    }
  },
  {
    name: 'Mike Mentor',
    email: 'mike@mentor.com',
    password: 'mentor123',
    role: 'alumni',
    bio: 'Product Manager with expertise in agile methodologies',
    skills: ['Product Strategy', 'Agile', 'UX Design'],
    interests: ['Product Management', 'Startup Culture'],
    education: {
      institution: 'University of Technology',
      degree: 'MSc',
      field: 'Business Administration',
      graduationYear: 2015
    },
    career: {
      company: 'Innovate Corp',
      position: 'Product Manager',
      industry: 'Technology',
      experience: 9
    }
  }
];

const seedDB = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Mentorship.deleteMany({});
    
    // Insert sample users
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded successfully');
    
    // Create a sample mentorship
    const student = createdUsers.find(user => user.role === 'student');
    const mentor = createdUsers.find(user => user.role === 'alumni' && user.email === 'jane@alumni.com');
    
    if (student && mentor) {
      const mentorship = new Mentorship({
        student: student._id,
        mentor: mentor._id,
        status: 'active',
        startDate: new Date(),
        goals: [
          {
            title: 'Learn React Hooks',
            description: 'Master React Hooks including useState, useEffect, and custom hooks',
            targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
          }
        ],
        messages: [
          {
            sender: student._id,
            content: 'Hi Jane, I\'m excited to start this mentorship!'
          },
          {
            sender: mentor._id,
            content: 'Hello John! I\'m looking forward to working with you. What specific areas would you like to focus on?'
          }
        ]
      });
      
      await mentorship.save();
      console.log('Sample mentorship created');
    }
    
    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDB();