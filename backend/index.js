const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "form",
});

// data make to server api
app.post("/signup", (req, res) => {
  const sql = "INSERT INTO signup (`name`, `email`, `password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (error, data) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

// data send to frontend api
app.get("/login", (req, res) => {
  const sql = "SELECT * FROM signup WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (error, data) => {
    if (error) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  });
});

app.listen(5000, () => {
  console.log("Port is connected");
});
