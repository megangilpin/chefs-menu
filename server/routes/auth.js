const express = require("express");
const jwt = require("jsonwebtoken");

const userController = require("../controllers/usersController");

const router = express.Router();

router.post("/login", validationMiddleware, async function (req, res, next) {
    try {
        const { email, password } = req.body;
        // verify that there is user for email
        // verify that the passwords match
        // create and return jwt with user obj
        res.json({ user, token });
    } catch (error) {
        console.error(error)
        next(error);
    }
});

router.post("/register", validationMiddleware, async function (req, res, next) {
    try {
        const { email, password } = req.body;

        // verify that user isn't already in DB
        const user = await userController.findOneWithemail(email);
        if (user) {
            res.status(400).json({ errors: ["User already exists"] });
            return;
        }

        // validate that the password is valid
        if (password.length < 6) {
            res.status(400).json({
                errors: ["Password should be at least 6 characters long"],
            });
            return;
        }

        const createdUser = await userController.create({ email, password });
        const responseObj = await createResponseObj(createdUser._doc);
        res.status(201).json(responseObj);
    } catch (error) {
        console.error(error)
        next(error);
    }
});

function validationMiddleware(req, res, next) {
    const { email, password } = req.body;
    // input validation
    const errors = [];
    if (!email) errors.push("Missing email");
    if (!password) errors.push("Missing password");
    if (email && typeof email !== "string") errors.push("Invalid type");
    if (password && typeof password !== "string") errors.push("Invalid type");
    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }
    next();
}

async function createResponseObj(user) {
    const token = await jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET,
        { expiresIn: process.env.TOKEN_TTL }
    );
    return {
        user: { ...user, password: undefined },
        token,
    };
}

module.exports = router;
