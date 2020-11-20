require("dotenv").config();
// require("../dbConnection");
const chefsController = require("../controllers/chefsController");
const mealController = require("../controllers/mealsController");
const usersController = require("../controllers/usersController");

const resetDB = async () => {
    const resChefs = await chefsController.deleteAll();
    const resMeals = await mealController.deleteAll();
    const resUsers = await usersController.deleteAll();

    return { resChefs, resMeals, resUsers };
};

module.exports = resetDB;
