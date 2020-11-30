const jwt = require("jsonwebtoken");
const userController = require("./controllers/usersController");
const chefController = require("./controllers/chefsController");

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

const createChefProfile = async (id) => {
    const chefData = await chefController.findOneWithUserId(id);
    delete chefData.userId;
    return chefData;
};

// src: https://www.geodatasource.com/developers/javascript
// formula: http://edwilliams.org/gccalc.htm
const coordinatesDistanceCalc = (lat1, lng1, lat2, lng2, unit = "K") => {
    if (lat1 == lat2 && lng1 == lng2) {
        return 0;
    }
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lng1 - lng2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
        dist = dist * 1.609344;
    }
    if (unit == "N") {
        dist = dist * 0.8684;
    }
    return dist;
};

module.exports = {
    isArrayOfStrings,
    errorHandelingWrapper,
    createAuthResponseObj,
    createChefProfile,
    coordinatesDistanceCalc,
};
