const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(cors());

//serve react build files
app.use(express.static(path.join(__dirname, "build")));

//create connection to database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

app.get("/reviews", (req, res) => {
  db.query("SELECT * FROM movie_reviews", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/reviews", (req, res) => {
  const insertQuery = "INSERT INTO movie_reviews SET ?";

  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Review Added to Database");
    }
  });
});

app.put("/reviews", (req, res) => {
  const updateQuery =
    "UPDATE movie_reviews SET movie_review = ?, movie_rating = ? WHERE id = ?";
  db.query(
    updateQuery,
    [req.body.movie_review, req.body.movie_rating, req.body.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/reviews/:id", (req, res) => {
  db.query(
    "DELETE FROM movie_reviews WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + listener.address().port);
});
