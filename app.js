/* jshint esversion: 6 */
const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(morgan("short"));

// MySql connection function
const getConnection = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rajkumar",
    database: "MySchema"
  });
};

// Insert user into database
app.post("/movie", (req, res) => {
  const name = req.body.name;
  const director = req.body.director;
  const year = req.body.year;
  const hero = req.body.hero;
  const heroine = req.body.heroine;
  const queryString =
    "INSERT INTO movie (name, director, year, hero, heroine) VALUES (?, ?, ?, ?, ?)";

  getConnection().query(
    queryString,
    [name, director, year, hero, heroine],
    (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new movie" + err);
        res.sendStatus(500);
        return;
      }

      console.log(
        "Inserted new movie successfully with id " + results.insertId
      );
      res.send("Inserted new movie successfully with id " + results.insertId);
      res.end();
    }
  );
});

// fetching data using id from MySql
app.get("/movie/:id", (req, res) => {
  console.log("Fetching movie with id " + req.params.id);
  const movieId = req.params.id;
  const queryString = "SELECT * FROM movie WHERE id = ?";
  getConnection().query(queryString, [movieId], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log("fetched movie successfully !");
    res.json(rows);
  });
});

// Refactoring code
const router = express.Router();
router.get("/messages", (req, res) => {});
// retrive all users from MySql
app.get("/movies", (req, res) => {
  const queryString = "SELECT * FROM movie";
  getConnection().query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query retrive movies" + err);
      req.sendStatus(500);
      return;
    }
    console.log("Movies fetched successfully !");
    res.json(rows);
  });
});
// static data
app.get("/user", (req, res) => {
  let user = { firstName: "Rajkumar", lastName: "Patoliya" };
  res.json(user);
});

// localhost:300
app.listen(3000, () => {
  console.log("server started at 3000...");
});
