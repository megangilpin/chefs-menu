const connection = require("../dbConnection");
const mealSchema = require("../models/meal");

const Meal = connection.model("User", mealSchema);

// create
const create = async (meal) => {
    const { _doc } = await Meal.create();
};
// update

// delete

module.exports = {
    create,
};
