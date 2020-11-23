const jwt = require("jsonwebtoken");
const userController = require("./controllers/usersController");

const isArrayOfStrings = (arr) =>
    Array.isArray(arr) && arr.every((ele) => typeof ele === "string");

// function that takes in a request handeler and returns request handeler with exception handeling
// buld in
const errorHandelingWrapper = (routeFunction) => async (req, res, next) => {
    try {
        await routeFunction(req, res, next);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Unexpected error occured"] });
    }
};

const createAuthResponseObj = async (user) => {
    const token = await jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET,
        { expiresIn: process.env.TOKEN_TTL }
    );
    return {
        user: await userController.sanatize(user),
        token,
    };
};

module.exports = {
    isArrayOfStrings,
    errorHandelingWrapper,
    createAuthResponseObj,
};
