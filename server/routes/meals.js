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
    errorHandelingWrapper(validationMiddleware),
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
    errorHandelingWrapper(validationMiddleware),
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

async function validationMiddleware(req, res, next) {
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
        req.body.chefId = String(_id);
    }

    next();
}

// uploads image to AWS s3 and updates user schema with url of profile image
router.post(
    "/mealImageUpload",
    errorHandelingWrapper(async (req, res, next) => {
        const errors = [];
        if (req.files === null) {
            return res.status(400).json({ msg: "No file uploaded" });
        }
        const { id } = req.user;

        // upload image to s3 with the help of multer-s3
        profileImgUpload(req, res, (error) => {
            if (error) {
                errors.push(error);
            } else {
                if (req.file === undefined) {
                    errors.push("No File Selected");
                }
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }
            const body = {};
            body.profilePicURL = req.file.location;

            // save the url to the user and return url
        });
    })
);

module.exports = router;
