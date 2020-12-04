// ROUTER FOR OUR CHEF
const router = require("express").Router();

const chefsController = require("../controllers/chefsController");
const usersController = require("../controllers/usersController");
const { isArrayOfStrings, errorHandelingWrapper } = require("../util");

// get a chef for an id
router.get(
    "/:id",
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ errors: ["Missing id for chef"] });
            return;
        }
        const chef = await chefsController.findOneWithId(id);

        if (!chef) {
            res.status(400).json({ errors: ["Chef not found for given id"] });
            return;
        }

        chef.userId.password = undefined;

        res.json(chef);
    })
);

// get the chef profile for signedin user
router.get(
    "/",
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.user;
        const chef = await chefsController.findOneWithUserId(id);
        if (!chef) {
            res.status(400).json({
                errors: ["Chef profile not found for loggedin user"],
            });
            return;
        }
        res.json(chef);
    })
);
router.get(
    "/",
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.user;
        const chef = await chefsController.findOneWithUserId(id);
        if (!chef) {
            res.status(400).json({
                errors: ["Chef profile not found for loggedin user"],
            });
            return;
        }
        res.json(chef);
    })
);

// update the chef profile for signedin user
router.put(
    "/",
    errorHandelingWrapper(validationMiddleware),
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.user;
        let { cuisineSpecialty } = req.body;
        const chef = await chefsController.findOneWithUserId(id);
        if (!chef) {
            res.status(400).json({
                errors: ["Chef profile not found for logged in user"],
            });
            return;
        }
        const newChef = await chefsController.update(chef, {
            cuisineSpecialty,
            userId: id,
        });

        res.json(newChef.cuisineSpecialty);
    })
);

// create a chef profile for signedin user
router.post(
    "/",
    errorHandelingWrapper(validationMiddleware),
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.user;
        let { cuisineSpecialty } = req.body;
        const chef = await chefsController.findOneWithUserId(id);

        if (chef) {
            res.status(400).json({
                errors: ["Chef already exist for loggedin user"],
            });
            return;
        }
        const newChef = await chefsController.create({
            cuisineSpecialty,
            userId: id,
        });
        delete newChef.userId;
        await usersController.update(id, { isChef: true });
        res.json(newChef);
    })
);

function validationMiddleware(req, res, next) {
    let { cuisineSpecialty } = req.body;
    // input validation
    const errors = [];
    if (cuisineSpecialty) {
        if (!isArrayOfStrings(cuisineSpecialty)) errors.push("Invalid cuisineSpecialty type");
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }
    next();
}

module.exports = router;
