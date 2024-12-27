const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  links: [{ type: String }],
});

module.exports = mongoose.model('Topic', topicSchema);
