const express = require('express');
const router = express.Router();

console.log("🔥 Export routes file loaded");

router.get('/pdf/:id', (req, res) => {
  res.send("PDF route working");
});

module.exports = router;

