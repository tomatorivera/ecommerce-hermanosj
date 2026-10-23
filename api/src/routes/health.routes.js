const express = require("express");
const router = express.Router();

// GET /api/ping
router.get("/", (req, res) => {
  res.send("pong");
});

module.exports = router;
