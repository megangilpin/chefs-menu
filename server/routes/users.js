// ROUTER FOR OUR USERS

const express = require("express");
const userController = require("../controllers/usersController");
const { loginRequired } = require("../middleware");
const router = express.Router();

router.get("/user", loginRequired, async function (req, res, next) {
    try {
        const { email, id } = req.user;

        let user = await userController.findOneWithEmail(email);
        if (!user) {
            res.status(400).json({ errors: ["Please sign in"] });
            return;
        };
        if(user.chef) {
            user.chef = await userController.findOneWithId(id);
        };

        delete user.password;

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
});

module.exports = router;
