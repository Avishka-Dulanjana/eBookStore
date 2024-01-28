import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import booksRoute from './routes/books_route';

const app = express();

// Middleware for parsing request bodies
app.use(express.json());

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_DB_URL;

app.use("/books", booksRoute);

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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connection();
});