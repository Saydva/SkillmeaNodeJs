const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

let movies = [
  { id: "34", title: "delete", genre: "Sci-Fi", rating: 10 },
  { id: uuid(), title: "Matrix", genre: "Sci-Fi", rating: 8.7 },
  { id: uuid(), title: "Titanic", genre: "Romance", rating: 7.8 },
  { id: uuid(), title: "Joker", genre: "Drama", rating: 8.5 },
];

// Endpoint pre zobrazenie informácií o filme na základe ID
router.get("/:id", (req, res) => {
  const movieId = req.params.id;
  const movie = movies.find((movie) => movie.id === movieId);
  if (!movie) {
    res.set("Content-Type", "text/plain");
    return res.status(404).send({ message: "Film nenájdený." });
  }
  res.set("Content-Type", "aplication/json");
  res.set("X-powered-By", "HelenSoft");
  res.send(movie);
});

// Endpoint pre triedenie filmov podľa hodnotenia
router.get("/", (req, res) => {
  const sortBy = req.query.sortBy;
  if (sortBy === "rating") {
    const sortedMovies = movies.sort((a, b) => b.rating - a.rating);
    return res.send(sortedMovies);
  }
  res.status(400).send({ message: "Nesprávne triedenie." });
});

router.post("/:id", (req, res) => {
  const { title, genre, rating } = req.body;
  if (!title || !genre || !rating) {
    return res.status(400).send({ message: "Chybaju udaje o filme" });
  }
  const newMovie = {
    id: uuid(),
    title,
    genre,
    rating,
  };
  movies.push(newMovie);
  res.status(201).send({
    message: `Film ${title} bol uspesne vytvoreny pod zanrom ${genre} s hodnotenim ${rating}`,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const movieTodelete = movies.find((movie) => movie.id === id);
  if (!movieTodelete) {
    return res.status(404).send({ message: "film nebol najdeny" });
  }
  movies = movies.filter((movie) => movie.id !== id);
  res.send({ mesage: `Film s ${id} bol uspesne vymazany` });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  let movieUpdated = false;
  if (!rating) {
    return res.status(400).send({ message: "Rating musi byt definovany" });
  }
  movies.forEach((movie) => {
    if (movie.id === id) {
      movie.rating = rating;
      movieUpdated = true;
    }
  });
  if (!movieUpdated) {
    return res.status(404).send({ message: "film nebol najdeny" });
  }
  res.send({ message: "Film bol uspesne updatovany" });
});

module.exports = router;
