const express = require("express");
const app = express();
const moviesRouter = require("./rutes/moviesroutes");
const booksRouter = require("./rutes/booksrouter");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Uvítacia root stránka
app.get("/", (req, res) => {
  res.send({ message: "Vitajte na našej webovej stránke s filmami!" });
});

app.use("/movies", moviesRouter);

app.use("/books", booksRouter);

// Genericky endpoint pre nesprávne cesty
app.get("*", (req, res) => {
  res.status(404).send({ message: "Upsss! Táto stránka neexistuje!" });
});

app.listen(3000, () => {
  console.log("Server spustený na porte 3000");
});
