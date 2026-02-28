const express = require("express");
const router = express.Router();
const { detectFraud } = require("../controllers/fraudController");

router.get("/detect-fraud", detectFraud);

module.exports = router;
router.get("/transactions", (req, res) => {
  const db = require("../db");
  db.query("SELECT from_account, to_account FROM transactions", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});