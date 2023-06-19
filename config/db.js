const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected successfully`);
  } catch (error) {
    console.log(`Error in connecting the database`);
  }
};

module.exports = connectDB;
