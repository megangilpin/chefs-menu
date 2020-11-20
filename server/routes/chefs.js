// ROUTER FOR OUR CHEF
const router = require("express").Router();

const chefsController = require("../controllers/chefsController");
const usersController = require("../controllers/usersController");
const { isArrayOfStrings } = require("../util");

// get a chef for an id
router.get("/:id", async (req, res) => {
    try {
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
        res.json(chef);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
});

// get the chef profile for signedin user
router.get("/", async (req, res) => {
    try {
        const { id } = req.user;
        const chef = await chefsController.findOneWithUserId(id);
        if (!chef) {
            res.status(400).json({
                errors: ["Chef profile not found for loggedin user"],
            });
            return;
        }
        res.json(chef);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
});

// update the chef profile for signedin user
router.put("/", async (req, res) => {
    try {
        const { id } = req.user;
        let { cuisineSpecialty } = req.body;
        const chef = await chefsController.findOneWithUserId(id);
        if (!chef) {
            res.status(400).json({
                errors: ["Chef profile not found for loggedin user"],
            });
            return;
        }
        const errors = [];
        if (!cuisineSpecialty) {
            errors.push("Missing cuisineSpecialty");
        } else {
            cuisineSpecialty = JSON.parse(cuisineSpecialty);
            if (!isArrayOfStrings(cuisineSpecialty))
                errors.push("Invalid cuisineSpecialty type");
        }

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }
        const newChef = await chefsController.update(chef, {
            cuisineSpecialty,
            userId: id,
        });
        res.json(newChef);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
});

// create a chef profile for signedin user
router.post("/", async (req, res) => {
    try {
        const { id } = req.user;
        let { cuisineSpecialty } = req.body;
        const chef = await chefsController.findOneWithUserId(id);
        if (chef) {
            res.status(400).json({
                errors: ["Chef already exist for loggedin user"],
            });
            return;
        }
        const errors = [];
        if (!cuisineSpecialty) {
            errors.push("Missing cuisineSpecialty");
        } else {
            cuisineSpecialty = JSON.parse(cuisineSpecialty);
            if (!isArrayOfStrings(cuisineSpecialty))
                errors.push("Invalid cuisineSpecialty type");
        }

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }
        const newChef = await chefsController.create({
            cuisineSpecialty,
            userId: id,
        });
        await usersController.update(id, { isChef: true });
        res.json(newChef);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
});

module.exports = router;
