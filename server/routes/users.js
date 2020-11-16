// ROUTER FOR OUR USERS

const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.get("/", async (req, res, next) => {
    try {
        const { email } = req.user;
        const user = await usersController.sanatize(
            await usersController.findOneWithEmail(email)
        );
        console.log(user);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
});

module.exports = router;
