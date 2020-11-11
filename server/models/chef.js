const mongoose = require('mongoose');
const { Schema } = mongoose;

const chefSchema = new Schema({
  profilePicURL: String,
  chefBio: {
    tagLine: { type: String, required: true },
    fullBio: { type: String, required: true },
  },
  cuisineSpecialty: [{ type: String, required: true }],
  // To Do: structure availability
  availability: {
    date: {type: Date},
    time: {type: Number}
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  userId: {type: Schema.Types.ObjectId, ref: 'Users'}
})

const Chef = mongoose.model("Chef", chefSchema);

module.exports = Chef;