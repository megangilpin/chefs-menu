const connection = require("../dbConnection");
const mealSchema = require("../models/meal");

const Meal = connection.model("Meal", mealSchema);

const findOneWithId = async (id) => {
    const { _doc } = await Meal.findById(id);
    return _doc;
};

const findAllWithChefId = async (chefId) => {
    const meals = await Meal.find(chefId);
    return meals;
};

// create
const create = async ({
    title,
    picURL,
    price,
    servingSize,
    servingType,
    cuisineType,
    ingredients,
    requirements,
    createdAt,
    updatedAt,
    chefId,
}) => {
    const pojsoMeal = {};
    if (title) pojsoMeal.title = title;
    if (picURL) pojsoMeal.picURL = picURL;
    if (price) pojsoMeal.price = price;
    if (servingSize) pojsoMeal.servingSize = servingSize;
    if (servingType) pojsoMeal.servingType = servingType;
    if (cuisineType) pojsoMeal.cuisineType = cuisineType;
    if (ingredients) pojsoMeal.ingredients = ingredients;
    if (requirements) pojsoMeal.requirements = requirements;
    if (createdAt) pojsoMeal.createdAt = createdAt;
    if (updatedAt) pojsoMeal.updatedAt = updatedAt;
    if (chefId) pojsoMeal.chefId = chefId;

    const { _doc } = (await Meal.create(pojsoMeal)) || {};
    return _doc;
};

// update
const update = async ({
    id,
    title,
    picURL,
    price,
    servingSize,
    servingType,
    cuisineType,
    ingredients,
    requirements,
    createdAt,
    updatedAt,
    chefId,
}) => {
    const meal = await Meal.findById(id);
    if (title) meal.title = title;
    if (picURL) meal.picURL = picURL;
    if (price) meal.price = price;
    if (servingSize) meal.servingSize = servingSize;
    if (servingType) meal.servingType = servingType;
    if (cuisineType) meal.cuisineType = cuisineType;
    if (ingredients) meal.ingredients = ingredients;
    if (requirements) meal.requirements = requirements;
    if (createdAt) meal.createdAt = createdAt;
    if (updatedAt) meal.updatedAt = updatedAt;
    if (chefId) meal.chefId = chefId;

    const { _doc } = await meal.save();
    return _doc;
};

// delete
const remove = async (id) => {
    return await Meal.findByIdAndDelete(id);
};

const findAllMeals = async (query) => {
    const meals = await Meal.find(query);
    return meals;
};

const deleteAll = async () => await Meal.deleteMany({});

module.exports = {
    findOneWithId,
    findAllWithChefId,
    findAllMeals,
    create,
    update,
    remove,
    deleteAll,
};
