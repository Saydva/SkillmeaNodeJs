const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let movies = [
  { id: uuid(), title: "Matrix", genre: "Sci-Fi", rating: 8.7 },
  { id: uuid(), title: "Titanic", genre: "Romance", rating: 7.8 },
  { id: uuid(), title: "Joker", genre: "Drama", rating: 8.5 },
];

// Uvítacia root stránka
app.get("/", (req, res) => {
  res.send({ message: "Vitajte na našej webovej stránke s filmami!" });
});

// Endpoint pre zobrazenie informácií o filme na základe ID
app.get("/movies/:id", (req, res) => {
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
app.get("/movies", (req, res) => {
  const sortBy = req.query.sortBy;
  if (sortBy === "rating") {
    const sortedMovies = movies.sort((a, b) => b.rating - a.rating);
    return res.send(sortedMovies);
  }
  res.status(400).send({ message: "Nesprávne triedenie." });
});

app.post("/movies", (req, res) => {
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

// Genericky endpoint pre nesprávne cesty
app.get("*", (req, res) => {
  res.status(404).send({ message: "Upsss! Táto stránka neexistuje!" });
});

app.listen(3000, () => {
  console.log("Server spustený na porte 3000");
});
