const mongoose = require('mongoose');
const { Schema } = mongoose;

const mealSchema = new Schema({
  title: { type: String, required: true },
  picURL: String,
  price: { type: Number, required: true },
  servingSize: { type: String, required: true },
  servingType: String,
  cuisineType: [{ type: String, required: true }],
  ingredients: { type: String, required: true },
  requirements: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  chefId: {type: Schema.Types.ObjectId, ref: 'Chefs'}
})

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;