const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");

// Configuring the dotenv file
dotenv.config();

//Declaring the PORT
const PORT = process.env.PORT;

// Connecting the database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);

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
