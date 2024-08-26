const movieModule = require("../modules/movieModel");

let movies = movieModule.movies;

const getMovie = (req, res) => {
  const id = req.params.id;
  const movie = movieModule.getMovie(id);
  if (!movie) {
    return res.status(404).send({ message: "Film nenájdený." });
  }
  res.send(movie);
};

const sortBy = (req, res) => {
  const sortBy = req.query.sortBy(req, res);
  if (sortBy === "rating") {
    const sortingBy = movieModule.sort(res, req);
  }
  res.status(400).send({ message: "Nesprávne triedenie." });
};

const postMovie = (req, res) => {
  const { title, genre, rating } = req.body;
  if (!title || !genre || !rating) {
    return res.status(400).send({ message: "Chybaju udaje o filme" });
  }
  let movie = movieModule.buildMovie(title, genre, rating);
  res.status(201).send({
    message: `Film ${title} bol uspesne vytvoreny pod zanrom ${genre} s hodnotenim ${rating}`,
  });
};

const deleteMovie = (req, res) => {
  const { id } = req.params;
  const success = movieModule.deleteMovie(id);
  if (!success) {
    return res.status(400).send({ message: "film nebol najdeny" });
  }
  res.send({ message: `Film s id${id} bol uspesne zmazany.` });
  movies = movies.filter((movie) => movie.id !== id);
};

const updateMovie = (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  if (!rating) {
    return res.status(400).send({ message: "Rating musí byť definovaný" });
  }
  const movie = movieModule.updateMovieRating(id, rating);
  if (!movie) {
    return res.status(404).send({ message: "Film nebol nájdený." });
  }
  res.send(movie);
};

module.exports = {
  getMovie,
  sortBy,
  postMovie,
  movies,
  deleteMovie,
  updateMovie,
};
