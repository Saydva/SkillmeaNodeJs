const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "toto som necekal do p...Knihy z GET /books" });
});

module.exports = router;
