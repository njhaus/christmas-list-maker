const express = require("express");
const app = express();
const port = 3009;

// Independent Imports
const { v4: uuidv4 } = require("uuid");

// Database
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("christmas_lists.db");

app.get("/", (req, res) => {
  db.all("SELECT * FROM lists", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log(rows); 
    res.json(rows); 
  });
});


process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Closed the database connection.");
    process.exit(0); 
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
