const express = require("express");
const jwt = require("jsonwebtoken");

const { loginRequired } = require("../middleware");
const { errorHandelingWrapper } = require("../util");
const userController = require("../controllers/usersController");
const chefsController = require("../controllers/chefsController");

const router = express.Router();

router.post(
    "/login",
    errorHandelingWrapper(validationMiddleware),
    errorHandelingWrapper(async (req, res) => {
        const { email, password } = req.body;
        // verify that there is user for email
        const user = await userController.findOneWithEmail(email);
        if (!user) {
            res.status(400).json({ errors: ["Email or password invalid"] });
            return;
        }
        // verify that the passwords match
        const passwordsMatch = await userController.checkPassword({
            user,
            password,
        });

        if (!passwordsMatch) {
            res.status(400).json({ errors: ["Email or password invalid"] });
            return;
        }
        // create and return jwt with user obj
        const responseObj = await createResponseObj(user);
        res.cookie("token", responseObj.token, { httpOnly: true });
        res.json(responseObj);
    })
);

router.post(
    "/register",
    errorHandelingWrapper(validationMiddleware),
    errorHandelingWrapper(async (req, res) => {
        const { email, password, chef } = req.body;
        const isChef = !!chef;
        // verify that user isn't already in DB
        const user = await userController.findOneWithEmail(email);
        if (user) {
            res.status(400).json({
                errors: ["User with given email already exists"],
            });
            return;
        }

        // validate that the password is valid
        if (password.length < 6) {
            res.status(400).json({
                errors: ["Password should be at least 6 characters long"],
            });
            return;
        }

        const createdUser = await userController.create({
            email,
            password,
            isChef,
        });
        const responseObj = await createResponseObj(createdUser);
        res.cookie("token", responseObj.token, { httpOnly: true });
        res.status(201).json(responseObj);
    })
);

router.get(
    "/user",
    loginRequired,
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.user;
        const user = await userController.findOneWithId(id);
        if (!user) {
            res.status(400).json({ errors: ["Please sign in"] });
            return;
        }
        if (user.isChef) {
            user.chef = await chefsController.findOneWithUserId(id);
        }
        // create and return jwt with user obj
        const responseObj = await createResponseObj(user);
        res.cookie("token", responseObj.token, { httpOnly: true });
        res.json(responseObj);
    })
);

router.put(
    "/user",
    loginRequired,
    errorHandelingWrapper(validationMiddleware),
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.user;
        const user = await usersController.sanatize(
            await usersController.update(id, req.body)
        );
        res.json(user);
    })
);

function validationMiddleware(req, res, next) {
    const { email, password } = req.body;
    // input validation
    const errors = [];
    if (!email) errors.push("Missing email");
    if (!password) errors.push("Missing password");

    if (email && typeof email !== "string")
        errors.push("Invalid type for email");

    if (password && typeof password !== "string")
        errors.push("Invalid type for password");

    if (email && !userController.isValidEmailFormat(email))
        errors.push("Invalid format for email");

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
        user: await userController.sanatize(user),
        token,
    };
}

module.exports = router;
