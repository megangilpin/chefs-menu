// ROUTER FOR OUR MEALS

const router = require("express").Router();
const mealController = require("../controllers/mealsController");
const chefsController = require("../controllers/chefsController");
const { errorHandelingWrapper, isArrayOfStrings } = require("../util");

router.get(
    "/:id",
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.params;
        const meal = await mealController.find(id);
        res.json(meal);
    })
);

router.post(
    "/",
    validationMiddleware,
    errorHandelingWrapper(async (req, res) => {
        const {
            title,
            picURL,
            price,
            servingSize,
            servingType,
            ingredients,
            requirements,
        } = req.body;
        let { chefId, cuisineType } = req.body;

        const errors = [];
        if (!title) errors.push("Missing title");
        if (!price) errors.push("Missing price");
        if (!servingSize) errors.push("Missing servingSize");
        if (!cuisineType) errors.push("Missing cuisineType");
        if (!ingredients) errors.push("Missing ingredients");

        const meal = await mealController.create({
            title,
            picURL,
            price,
            servingSize,
            servingType,
            cuisineType,
            ingredients,
            requirements,
            chefId,
        });

        res.json(meal);
    })
);

router.put(
    "/:id",
    validationMiddleware,
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.params;
        const {
            title,
            picURL,
            price,
            servingSize,
            servingType,
            ingredients,
            requirements,
        } = req.body;
        let { chefId, cuisineType } = req.body;

        const meal = await mealController.findOneWithId(id);
        if (!meal) {
            res.status(400).json({ errors: ["Meal for id not found"] });
            return;
        }

        const newMeal = await mealController.update({
            id,
            title,
            picURL,
            price,
            servingSize,
            servingType,
            cuisineType,
            ingredients,
            requirements,
            chefId,
        });

        res.json(newMeal);
    })
);

function validationMiddleware(req, res, next) {
    const {
        title,
        picURL,
        price,
        servingSize,
        servingType,
        ingredients,
        requirements,
    } = req.body;
    let { chefId, cuisineType } = req.body;

    const errors = [];
    if (title && typeof title !== "string") errors.push("Invalid title type");
    if (picURL && typeof picURL !== "string")
        errors.push("Invalid picURL type");
    if (price && Number.isFinite(price)) errors.push("Invalid price type");
    if (servingSize && typeof servingSize !== "string")
        errors.push("Invalid servingSize type");
    if (servingType && typeof servingType !== "string")
        errors.push("Invalid servingType type");
    if (cuisineType) {
        cuisineType = JSON.parse(cuisineType);
        if (!isArrayOfStrings(cuisineType))
            errors.push("Invlalid cuisineType type");
    }
    if (ingredients && typeof ingredients !== "string")
        errors.push("Invalid ingredients type");
    if (requirements && typeof requirements !== "string")
        errors.push("Invalid requirements type");

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    // if no chefId is provided, use the user's chef profile
    if (!chefId) {
        const userId = req.user.id;
        const { _id } = await chefsController.findOneWithUserId(userId);
        body.chefId = String(_id);
    }

    next();
}

module.exports = router;
