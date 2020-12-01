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

// src: https://stackoverflow.com/questions/36506668/google-static-map-draw-a-circle
const drawCirclePath = (lat, lng, radius, detail = 8) => {
    let R = 6371;

    let pi = Math.PI;

    lat = (lat * pi) / 180;
    lng = (lng * pi) / 180;
    let d = radius / R;

    let points = [];
    let i = 0;

    for (i = 0; i <= 360; i += detail) {
        let brng = (i * pi) / 180;

        let plat = Math.asin(
            Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(brng)
        );
        let plng =
            ((lng +
                Math.atan2(
                    Math.sin(brng) * Math.sin(d) * Math.cos(lat),
                    Math.cos(d) - Math.sin(lat) * Math.sin(plat)
                )) *
                180) /
            pi;
        plat = (plat * 180) / pi;

        let currentPoints = [plat, plng];
        points.push(currentPoints);
    }

    return createEncodings(points);
}

function createEncodings(coords) {
    var i = 0;

    var plat = 0;
    var plng = 0;

    var encoded_points = "";

    for (i = 0; i < coords.length; ++i) {
        var lat = coords[i][0];
        var lng = coords[i][1];

        encoded_points += encodePoint(plat, plng, lat, lng);

        plat = lat;
        plng = lng;
    }

    return encoded_points;
}

function encodePoint(plat, plng, lat, lng) {
    var dlng = 0;
    var dlat = 0;

    var late5 = Math.round(lat * 1e5);
    var plate5 = Math.round(plat * 1e5);

    var lnge5 = Math.round(lng * 1e5);
    var plnge5 = Math.round(plng * 1e5);

    dlng = lnge5 - plnge5;
    dlat = late5 - plate5;

    return encodeSignedNumber(dlat) + encodeSignedNumber(dlng);
}

function encodeSignedNumber(num) {
    var sgn_num = num << 1;

    if (num < 0) {
        sgn_num = ~sgn_num;
    }

    return encodeNumber(sgn_num);
}

function encodeNumber(num) {
    var encodeString = "";

    while (num >= 0x20) {
        encodeString += String.fromCharCode((0x20 | (num & 0x1f)) + 63);
        num >>= 5;
    }
    encodeString += String.fromCharCode(num + 63);

    return encodeString;
}

module.exports = {
    isArrayOfStrings,
    errorHandelingWrapper,
    createAuthResponseObj,
    coordinatesDistanceCalc,
    drawCirclePath,
};
