const { v4: uuid } = require("uuid");

let movies = [
  { id: "34", title: "delete", genre: "Sci-Fi", rating: 10 },
  { id: uuid(), title: "Matrix", genre: "Sci-Fi", rating: 8.7 },
  { id: uuid(), title: "Titanic", genre: "Romance", rating: 7.8 },
  { id: uuid(), title: "Joker", genre: "Drama", rating: 8.5 },
];

const getMovie = (req, res) => {
  const movieId = req.params.id;
  const movie = movies.find((movie) => movie.id === movieId);
  if (!movie) {
    res.set("Content-Type", "text/plain");
    return res.status(404).send({ message: "Film nenájdený." });
  }
  res.set("Content-Type", "aplication/json");
  res.set("X-powered-By", "HelenSoft");
  res.send(movie);
};

const sortBy = (req, res) => {
  const sortBy = req.query.sortBy;
  if (sortBy === "rating") {
    const sortedMovies = movies.sort((a, b) => b.rating - a.rating);
    return res.send([{ "dlzka pola": movies.length }, sortedMovies]);
  }
  res.status(400).send({ message: "Nesprávne triedenie." });
};

const postMovie = (req, res) => {
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
};

const deleteMovie = (req, res) => {
  const { id } = req.params;
  const movieTodelete = movies.find((movie) => movie.id === id);
  if (!movieTodelete) {
    return res.status(404).send({ message: "film nebol najdeny" });
  }
  movies = movies.filter((movie) => movie.id !== id);
  res.send({ mesage: `Film s ${id} bol uspesne vymazany` });
};

const patchMovie = (req, res) => {
  const { id } = req.params;
  const { title, genre, rating } = req.body;
  let movieUpdated = false;
  if (title || rating || genre) {
    movies.forEach((movie) => {
      if (movie.id === id) {
        if (rating) {
          movie.rating = rating;
        }
        if (title) {
          movie.title = title;
        }
        if (genre) {
          movie.genre = genre;
        }

        movieUpdated = true;
      }
    });
  } else {
    res.status(400).send({ message: "Definujte prosim" });
  }
  if (!movieUpdated) {
    return res.status(404).send({ message: "film nebol najdeny" });
  }
  res.send({ message: "Film bol uspesne updatovany" });
};

module.exports = {
  getMovie,
  sortBy,
  postMovie,
  movies,
  deleteMovie,
  patchMovie,
};
