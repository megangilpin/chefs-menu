const mongoose = require('mongoose');
const { Schema } = mongoose;

const chefSchema = new Schema({
  cuisineSpecialty: [{ type: String, required: true }],
  // To Do: structure availability
  availability: {
    date: {type: Date},
    time: {type: Number}
  },
  userId: {type: Schema.Types.ObjectId, ref: 'Users'}
})

const Chef = mongoose.model("Chef", chefSchema);

module.exports = Chef;