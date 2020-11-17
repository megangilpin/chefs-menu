const connection = require("../dbConnection");
const mealSchema = require("../models/meal");

const Meal = connection.model("Meal", mealSchema);

const find = async (id) => {
    const { _doc } = await Meal.findById(id);
    return _doc;
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
    const { _doc } =
        (await Meal.create({
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
        })) || {};
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

    if (title) meal.title;
    if (picURL) meal.picURL;
    if (price) meal.price;
    if (servingSize) meal.servingSize;
    if (servingType) meal.servingType;
    if (cuisineType) meal.cuisineType;
    if (ingredients) meal.ingredients;
    if (requirements) meal.requirements;
    if (createdAt) meal.createdAt;
    if (updatedAt) meal.updatedAt;
    if (chefId) meal.chefId;

    const { _doc } = await meal.save();
    return _doc;
};

// delete
const remove = async (id) => {
    return await Meal.findByIdAndDelete(id);
};

const deleteAll = async () => await Meal.deleteMany({});

module.exports = {
    find,
    create,
    update,
    remove,
    deleteAll,
};
