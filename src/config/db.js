const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To DB");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDB;
