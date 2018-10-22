/* jshint esversion: 6 */
const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");

app.use(morgan("short"));

app.get("/users/:id", (req, res) => {
  console.log("Fetching user with id " + req.params.id);
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rajkumar",
    database: "users"
  });
  connection.query("SELECT * FROM users", (err, rows, fields) => {
    console.log("fetched users successfully !");
    res.json(rows);
  });
  //res.end();
});

app.get("/users", (req, res) => {
  let users = { firstName: "Rajkumar", lastName: "Patoliya" };
  res.json(users);
});

// localhost:300
app.listen(3000, () => {
  console.log("server started at 3000...");
});
