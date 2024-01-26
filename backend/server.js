import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_DB_URL;

const connection = () => {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("Database connection successful..!");
    })
    .catch((e) => {
      console.log("Database connection failed..!" + e);
    });
};

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connection();
});
