const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

// Configuring the dotenv file
dotenv.config();

//Declaring the PORT
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.send("Welcome to the chat server");
});

// Listening the server
app.listen(PORT, (err, res) => {
  if (err) {
    console.log(`Error connecting to the database`);
  }
  console.log(`Successfully connected to the server`);
});
