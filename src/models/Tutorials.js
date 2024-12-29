const mongoose = require('mongoose');

const tutorialsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  links: [{ type: String }],
});

module.exports = mongoose.model('Tutorials', tutorialsSchema);