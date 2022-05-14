const mongoose = require("mongoose");

const connectDB = (url) => {
     mongoose
    .connect(url)
    .then(() => console.log("db connected"));
};

module.exports = connectDB;
