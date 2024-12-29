const express = require('express');
const { getTutorials, getLinksByTutorial, addTutorial } = require('../controllers/tutorialsController');
const router = express.Router();

router.get('/tutorials', getTutorials); // Get all tutorials
router.get('/tutorials/:title', getLinksByTutorial); // Get links for a specific tutorial
router.post('/tutorials', addTutorial); // Add a new tutorial with links

module.exports = router;