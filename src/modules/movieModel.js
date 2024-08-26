const { v4: uuid } = require("uuid");

let movies = [
  { id: "34", title: "delete", genre: "Sci-Fi", rating: 10 },
  { id: uuid(), title: "Matrix", genre: "Sci-Fi", rating: 8.7 },
  { id: uuid(), title: "Titanic", genre: "Romance", rating: 7.8 },
  { id: uuid(), title: "Joker", genre: "Drama", rating: 8.5 },
];

const getMovie = (id) => {
  return movies.find((movie) => movie.id == id);
};

const deleteMovie = (id) => {
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    return (movies = movies.filter((movie) => movie.id !== id));
  }
};

const updateMovieRating = (id, rating) => {
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    movie.rating = rating;
    return movie;
  }
  return null;
};

const sort = (res, req) => {
  let sortedMovies = movies.sort((a, b) => b.rating - a.rating);
  return res.send([{ "dlzka pola": movies.length }, sortedMovies]);
};

const buildMovie = (title, genre, rating) => {
  if (title || genre || rating) {
    let newMovie = {
      id: uuid(),
      title: title,
      genre: genre,
      rating: rating,
    };
    movies.push(newMovie);
  }
};

module.exports = {
  movies,
  getMovie,
  deleteMovie,
  updateMovieRating,
  sort,
  buildMovie,
};
