const express = require('express');
const { getTopics, getLinksByTopic, addTopic } = require('../controllers/topicController');
const router = express.Router();

router.get('/topics', getTopics); // Get all topics
router.get('/topics/:title', getLinksByTopic); // Get links for a specific topic
router.post('/topics', addTopic); // Add a new topic with links

module.exports = router;
