import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import booksRoute from "./routes/books_route.js";

const app = express();

// Middleware for parsing request bodies
app.use(express.json());

// Middleware for handling CORS policy
// -- 01. Allow all requests from all origins with default CORS(*)
app.use(cors());

// -- 02. Allow specific origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

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
