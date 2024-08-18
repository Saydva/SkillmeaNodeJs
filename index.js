const express = require("express");
const app = express();

// Simulácia databázy filmov - to ste vy robiť nemuseli
let movies = [
  { id: 1, title: "Matrix", genre: "Sci-Fi", rating: 8.7 },
  { id: 2, title: "Titanic", genre: "Romance", rating: 7.8 },
  { id: 3, title: "Joker", genre: "Drama", rating: 8.5 },
];

// Uvítacia root stránka
app.get("/", (req, res) => {
  res.send("Vitajte na našej webovej stránke s filmami!");
});

// Endpoint pre zobrazenie informácií o filme na základe ID
app.get("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const movie = movies.find((movie) => movie.id === parseInt(movieId));
  if (!movie) {
    return res.status(404).send("Film nenájdený.");
  }
  res.send(movie);
});

// Endpoint pre triedenie filmov podľa hodnotenia
app.get("/movies", (req, res) => {
  const sortBy = req.query.sortBy;
  if (sortBy === "rating") {
    const sortedMovies = movies.sort((a, b) => b.rating - a.rating);
    return res.send(sortedMovies);
  }
  res.status(400).send("Nesprávne triedenie.");
});

// Genericky endpoint pre nesprávne cesty
app.get("*", (req, res) => {
  res.status(404).send("Upsss! Táto stránka neexistuje!");
});

app.listen(3000, () => {
  console.log("Server spustený na porte 3000");
});
