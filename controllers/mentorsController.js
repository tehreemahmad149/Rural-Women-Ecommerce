const Mentor = require('../models/Mentors');

// Get all mentors
const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new mentor
const addMentor = async (req, res) => {
  try {
    const { name, profilePicture, description, courseTitle, courseLink, linkedinLink } = req.body;
    const newMentor = new Mentor({
      name,
      profilePicture,
      description,
      courseTitle,
      courseLink,
      linkedinLink,
    });
    await newMentor.save();
    res.status(201).json({ message: 'Mentor added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMentors, addMentor };
