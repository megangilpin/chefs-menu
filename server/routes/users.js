const express = require("express");

const { errorHandelingWrapper, createAuthResponseObj } = require("../util");
const usersController = require("../controllers/usersController");
const chefsController = require("../controllers/chefsController");

const router = express.Router();

router.get(
    "/",
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.user;
        const user = await usersController.findOneWithId(id);
        if (!user) {
            res.status(400).json({ errors: ["Please sign in"] });
            return;
        }
        if (user.isChef) {
            user.chef = await chefsController.findOneWithUserId(id);
        }
        // create and return jwt with user obj
        const responseObj = await createAuthResponseObj(user);
        res.cookie("token", responseObj.token, { httpOnly: true });
        res.json(responseObj);
    })
);

router.put(
    "/",
    errorHandelingWrapper(async (req, res) => {
        const { id, password, email } = req.user;
        const errors = [];
        
        if (password && (typeof password !== "string" || password.length < 6))
            errors.push("Invalid password");
        if (email && !usersController.isValidEmailFormat(email))
            errors.push("Invalid email");
        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const user = await usersController.sanatize(
            await usersController.update(id, req.body)
        );
        const responseObj = await createAuthResponseObj(user);
        res.json(responseObj);
    })
);

module.exports = router;
