const mongoose = require("mongoose");

const config = require("config");

// Use this for local
// const db = config.get('mongoURI')

const db = process.env.DATABASE_URL || config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, { dbName: "LocalBiz"});
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};


module.exports = connectDB;