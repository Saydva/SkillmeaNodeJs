const express = require("express");
const app = express();
const port = 3000;

//Simulacia databazy filmov - nemuselo byt ale je
const movies = [
  { id: 1, title: "Matrix", genre: "Scifi", rating: 8.7 },
  { id: 2, title: "Titanic", genre: "Romance", rating: 7.8 },
  { id: 3, title: "Joker", genre: "Drama", rating: 8.5 },
];

//Uvitacia root obrazovka
app.get("/", (req, res) => {
  res.send("Vitajte na nasej webovel stranke s filmami.!");
});

//Endpoint pre zobrazenie informacii o filme na zaklade ID

app.get("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const movie = movies.find((movie) => movieId === parseInt(movieId));
  if (!movie) {
    return res.status(400).send("Film nenajdeni");
  }
  res.send(movie);
});

//Endpoint pre triedenie filmov podla hodnotenia

app.get("/movies/", (req, res) => {
  const sortBy = req.params.sortBy;
  if (sortBy === "rating") {
    const sortedMovies = movies.sort((a, b) => b.rating - a.rating);
    return res.send(sortedMovies);
  }
  res.status(400).send("Nespravne zadanie");
});

app.get("*", (req, res) => {
  res.status(404).send("Starnka neexistuje!!");
});

app.listen(port, () => {
  console.log(`Server je spusteny na porte${port}`);
});
