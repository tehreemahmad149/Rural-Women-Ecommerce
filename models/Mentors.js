const mongoose = require('mongoose');

const mentorsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profilePicture: { type: String, required: true },
  description: { type: String, required: true },
  courses: [
    {
      title: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  linkedinLink: { type: String, required: true },
});

module.exports = mongoose.model('Mentors', mentorsSchema);
