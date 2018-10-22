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
    database: "users"
  });
};

// Insert user into database
app.post("/user_create", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const queryString = "INSERT INTO users (fname, lname) VALUES (?, ?)";

  getConnection().query(
    queryString,
    [firstName, lastName],
    (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user" + err);
        res.sendStatus(500);
        return;
      }

      console.log("Inserted new user successfully with id " + results.insertId);
      res.send("Inserted new user successfully with id " + results.insertId);
      res.end();
    }
  );
});

// fetching data using id from MySql
app.get("/users/:id", (req, res) => {
  console.log("Fetching user with id " + req.params.id);
  const userId = req.params.id;
  const queryString = "SELECT * FROM users WHERE id = ?";
  getConnection().query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log("fetched users successfully !");
    res.json(rows);
  });
});
// retrive all users from MySql
app.get("/users", (req, res) => {
  const queryString = "SELECT * FROM users";
  getConnection().query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Cannot retrive users" + err);
      req.sendStatus(500);
      return;
    }
    console.log("Users fetched successfully !");
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
