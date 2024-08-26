const express = require("express");
const router = express.Router();
const movieControler = require("../controlers/movieControler");

// Endpoint pre zobrazenie informácií o filme na základe ID
router.get("/:id", movieControler.getMovie);

// Endpoint pre triedenie filmov podľa hodnotenia
router.get("/", movieControler.sortBy);

router.post("/:id", movieControler.postMovie);

router.delete("/:id", movieControler.deleteMovie);

router.patch("/:id", movieControler.patchMovie);

module.exports = router;
