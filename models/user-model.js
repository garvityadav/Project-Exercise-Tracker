const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const logSchema = new mongoose.Schema({
  description:{
    type:String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date:{
    type: String
  }
})
const schema = new mongoose.Schema({
    username: { type: String, required: true },
    count:{
      type: Number,
      default:0,
    },
    log:{
      type: [logSchema],
    }
  });
 
 
 module.exports = mongoose.model("newUser", schema);