const express = require("express");

const { errorHandelingWrapper, createAuthResponseObj, findChefProfile } = require("../util");
const userController = require("../controllers/usersController");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
        if (user.isChef) {
            user.chefProfile = await findChefProfile(user._id);
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
        const responseObj = await createAuthResponseObj(user);
        res.cookie("token", responseObj.token, { httpOnly: true });
        res.json(responseObj);
    })
);

router.post(
    "/register",
    errorHandelingWrapper(validationMiddleware),
    errorHandelingWrapper(async (req, res) => {
        const { name, address, email, password, chef } = req.body;
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

        const [firstName, ...rest] = name.split(" ");
        const lastName = rest.join(" ");

        const addressArr = address.split(", ");

        let street = "";
        let city = "";
        let region = "";
        let country = "";

        if (addressArr.length === 2) {
            [city, country] = addressArr;
        }
        if (addressArr.length === 3) {
            [city, region, country] = addressArr;
        }
        if (addressArr.length === 4) {
            [street, city, region, country] = addressArr;
        }

        // STRIPE CONNECTED ACCOUNT ONBOARDING FOR CHEFS
        let stripeId = "";
        if (isChef) {
            const account = await stripe.accounts.create({
                type: "express",
                email: email,
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                },
            });

            stripeId = account.id;
        }

        const createdUser = await userController.create({
            firstName,
            lastName,
            street,
            city,
            region,
            country,
            email,
            password,
            isChef,
            stripeId,
        });

        const responseObj = await createAuthResponseObj(createdUser);
        res.cookie("token", responseObj.token, { httpOnly: true });
        res.status(201).json(responseObj);
    })
);

function validationMiddleware(req, res, next) {
    const { email, password } = req.body;
    // input validation
    const errors = [];
    if (!email) errors.push("Missing email");
    if (!password) errors.push("Missing password");

    if (email && typeof email !== "string") errors.push("Invalid type for email");

    if (password && typeof password !== "string") errors.push("Invalid type for password");

    if (email && !userController.isValidEmailFormat(email)) errors.push("Invalid format for email");

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }
    next();
}

module.exports = router;
