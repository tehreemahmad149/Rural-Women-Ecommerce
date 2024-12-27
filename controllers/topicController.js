const Topic = require('../models/Topic');

// Get all topics
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({}, 'title'); // Fetch only titles
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get links for a specific topic
const getLinksByTopic = async (req, res) => {
  try {
    const topic = await Topic.findOne({ title: req.params.title });
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.status(200).json(topic.links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new topic
const addTopic = async (req, res) => {
  try {
    const { title, links } = req.body;
    const newTopic = new Topic({ title, links });
    await newTopic.save();
    res.status(201).json({ message: 'Topic added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTopics, getLinksByTopic, addTopic };
