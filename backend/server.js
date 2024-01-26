import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import { Book } from "./models/book_model.js";

const app = express();

// Middleware for parsing request bodies
app.use(express.json());

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

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publisherYear) {
      return res.status(400).send({ message: "Send all required fields..!" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publisherYear: req.body.publisherYear,
    };

    const book = await Book.create(newBook);

    return res.status(200).json(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ count: books.length, data: books });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const books = await Book.findById(req.params.id);
    return res.status(200).json(books);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publisherYear) {
      return res.status(400).send({ message: "Send all required fields..!" });
    }
    const result = await Book.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Book not found..!" });
    }

    return res.status(200).json({ message: "Book updated successfully..!" });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "Book not found..!" });
    }
    return res.status(200).send({ message: "Book deleted successfully..!" });
    
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connection();
});
