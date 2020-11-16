// ROUTER FOR OUR USERS

const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.get("/", async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await usersController.sanatize(
            await usersController.findOneWithId(id)
        );
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
});

router.put("/", async (req, res, next) => {
    try {
        const { id } = req.user;
        const { email, password } = req.body;

        const errors = [];
        // validate that the password is valid
        if (email && !usersController.isValidEmailFormat(email))
            errors.push("Invalid email");

        // validate that the password is valid
        if (password && password.length < 6)
            errors.push("Password should be at least 6 characters long");

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const user = await usersController.update(id, req.body);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
});

module.exports = router;
