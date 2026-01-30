const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createProject, getProjects, getProject, deleteProject } = require('../controllers/projectController');

router.post('/create', auth, createProject);
router.get('/all', auth, getProjects);
router.get('/:id', auth, getProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
