const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username: { type: String, require: true },
    log: [],
  });
 
 
 module.exports = mongoose.model("newUser", schema);