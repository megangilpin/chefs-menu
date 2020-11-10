const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: String,
  password: { type: Number, required: true },
  // Do we need reset ability yet?
  resetToke: Number,
  resetTokenExpiry: Date,
  // To do: add validation
  email: { 
    type: String, 
    required: true,
    unique: true,
  },
  primaryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    postalCode: { type: Number, required: true },
    country: { type: String, required: true },
  },
  // To do: add validation
  primaryPhone: Number,
  profilePicURL: String,
  bio: String,
  favoriteCuisine: [{
    type:String,
    length: 5,
  }],
  allergies: String,
  isChef: {type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
})

const User = mongoose.model("Users", userSchema);

module.exports = User;