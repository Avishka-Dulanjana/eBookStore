import express from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello World");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
