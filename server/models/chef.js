const mongoose = require('mongoose');
const { Schema } = mongoose;

const chefSchema = new Schema({
  profilePicURL: String,
  chefBio: {
    tagLine: { type: Number, required: true },
    fullBio: { type: Number, required: true },
  },
  cuisineSpecialty: { type: Number, required: true },
  // array of meal id's associated with this chef. May not need and could cause problems because we would have to ensure this is updated along with the recipes collection. But could be helpful in quickly loading the chefs meals.
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  // not sure how to structure availability. Depends on how we want them to select their availability/how user chooses available chefs
  availability: {
    date: {type: Date},
    time: {type: Number}
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  userId: {type: Schema.Types.ObjectId, ref: 'Users'}
})

const Chef = mongoose.model("Chefs", chefSchema);

module.exports = Chef;