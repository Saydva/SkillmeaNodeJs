const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "toto som upscakal do p...Knihy z GET /books" });
});

router.get("/prekvapko", (req, res) => {
  res.send({
    message:
      "nodemon nepotrebujes, node ma --watch na restart servera.!!!!  A je ovela stabilnejsi hahahahahahahah!!!!!",
  });
});

module.exports = router;
