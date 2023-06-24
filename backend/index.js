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
  database: "form_validataion",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (error, data) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.listen(5000, () => {
  console.log("Port is connected");
});
