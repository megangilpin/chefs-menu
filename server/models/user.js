const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // To Do: define user using mongoose.js
})

const User = mongoose.model("User", userSchema);

module.exports = User;