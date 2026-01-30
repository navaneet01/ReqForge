const express = require('express');
console.log("🔥 Export routes file loaded");
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { exportPDF } = require('../controllers/exportController');

router.get('/pdf/:id', auth, exportPDF);

module.exports = router;