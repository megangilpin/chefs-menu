const mongoose = require('mongoose');
const { Schema } = mongoose;

const mealSchema = new Schema({
  title: { type: String, required: true },
  picURL: String,
  price: { type: Number, required: true },
  // ie: 2 people, 4 people
  servingSize: { type: String, required: true },
  // ie: family style, buffet
  servingType: String,
  cuisineType: [{ type: String, required: true }],
  ingredients: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  chefId: {type: Schema.Types.ObjectId, ref: 'Chefs'}
})

const Meal = mongoose.model("Meals", mealSchema);

module.exports = Meal;