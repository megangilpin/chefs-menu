const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: String,
  password: { type: Number, required: true },
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
  primaryPhone: Number,
  profilePicURL: String,
  bio: String,
  favoriteCuisine: [{ type: String }],
  allergies: String,
  isChef: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
})

const User = mongoose.model("User", userSchema);

module.exports = User;