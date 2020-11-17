// ROUTER FOR OUR MEALS

const router = require("express").Router();
const mealController = require("../controllers/mealsController");

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const meal = await mealController.find(id);
        return meal;
    } catch (errors) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            title,
            picURL,
            price,
            servingSize,
            servingType,
            cuisineType,
            ingredients,
            requirements,
            chefId,
        } = req.body;

        const errors = [];
        if (!title) errors.push("Missing title");
        if (!price) errors.push("Missing price");
        if (!servingSize) errors.push("Missing servingSize");
        if (!cuisineType) errors.push("Missing cuisineType");
        if (!ingredients) errors.push("Missing ingredients");
        if (!chefId) errors.push("Missing chefId");

        if (title && typeof title !== "string")
            errors.push("Invalid title type");
        if (picURL && typeof picURL !== "string")
            errors.push("Invalid picURL type");
        if (price && Number.isFinite(price))
            errors.push("Invalid price type");
        if (servingSize && typeof servingSize !== "string")
            errors.push("Invalid servingSize type");
        if (servingType && typeof servingType !== "string")
            errors.push("Invalid servingType type");
        if (cuisineType && Array.isArray(cuisineType))
            errors.push("Invlalid cuisineType type");
        if (ingredients && typeof ingredients !== "string")
            errors.push("Invalid ingredients type");
        if (requirements && typeof requirements !== "string")
            errors.push("Invalid requirements type");
        if (chefId && typeof chefId !== "string")
            errors.push("Invalid requirements type");

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const meal = await mealController.create({
            title,
            picURL,
            price,
            servingSize,
            servingType,
            cuisineType,
            ingredients,
            requirements,
            ichefId,
        });

        res.json(meal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
});

router.put("/", async (req, res) => {
    try {
        const {
            title,
            picURL,
            price,
            servingSize,
            servingType,
            cuisineType,
            ingredients,
            requirements,
            chefId,
        } = req.body;

        const errors = [];

        if (title && typeof title !== "string")
            errors.push("Invalid title type");
        if (picURL && typeof picURL !== "string")
            errors.push("Invalid picURL type");
        if (price && Number.isFinite(price)) errors.push("Invalid price type");
        if (servingSize && typeof servingSize !== "string")
            errors.push("Invalid servingSize type");
        if (servingType && typeof servingType !== "string")
            errors.push("Invalid servingType type");
        if (cuisineType && Array.isArray(cuisineType))
            errors.push("Invlalid cuisineType type");
        if (ingredients && typeof ingredients !== "string")
            errors.push("Invalid ingredients type");
        if (requirements && typeof requirements !== "string")
            errors.push("Invalid requirements type");
        if (chefId && typeof chefId !== "string")
            errors.push("Invalid requirements type");

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const meal = await mealController.update({
            title,
            picURL,
            price,
            servingSize,
            servingType,
            cuisineType,
            ingredients,
            requirements,
            ichefId,
        });

        res.json(meal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
});

module.exports = router;
