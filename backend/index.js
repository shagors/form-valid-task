import express, { json } from "express";
import { createConnection } from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(json());
app.use(cors());

const salt = 10;

const verifyJwt = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.json("You are not authorized person");
  } else {
    jwt.verify(token, "jwtSecretKey", (error, decode) => {
      if (error) {
        res.json("Not Authonticated");
      } else {
        req.userId = decode.id;
        next();
      }
    });
  }
};

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "form",
});

// data make to server api
app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
  const password = req.body.password;
  bcrypt.hash(password.toString(), salt, (error, hash) => {
    if (error) {
      console.log(error);
    }
    const values = [req.body.name, req.body.email, hash];
    db.query(sql, [values], (error, data) => {
      if (error) {
        return res.json("Error");
      }
      return res.json(data);
    });
  });
});

app.get("/checkauth", verifyJwt, (req, res) => {
  return res.json("Authen");
});

// data send to frontend api
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ?";
  db.query(sql, [req.body.email], (error, data) => {
    if (error) {
      return res.json("Error");
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (error, response) => {
          if (error) {
            return res.json("Error");
          }
          if (response) {
            const id = data[0].id;
            const token = jwt.sign({ id }, "jwtSecretKey", {
              expiresIn: 300,
            });
            return res.json({ Login: true, token, data });
          }
          return res.json({ Login: false });
        }
      );
    } else {
      return res.json("Failed");
    }
  });
});

app.listen(5000, () => {
  console.log("Port is connected");
});
