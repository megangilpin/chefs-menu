const express = require("express");
const axios = require("axios");
const fs = require("fs");

const { errorHandelingWrapper } = require("../util");
const userController = require("../controllers/usersController");

const router = express.Router();

router.get(
    "/static",
    errorHandelingWrapper(async (req, res) => {
        let { center } = req.query;
        const { id } = req.user;

        // if no center is provided use the users address
        if (!center) {
            const user = await userController.findOneWithId(id);
            const {
                primaryAddress: { city, region },
            } = user;
            center = city + "," + region;
        }

        const { headers, data, status } = await axios({
            method: "get",
            url: `https://maps.googleapis.com/maps/api/staticmap?center=${center}&scale=2&zoom=13&size=600x300&maptype=roadmap&key=${process.env.GOOGLE_MAPS_API_KEY}`,
            responseType: "stream",
        });

        res.set({
            "content-type": headers["content-type"],
            date: headers.date,
            vary: "Accept-Language",
            expires: headers.expires,
            "cache-control": headers["cache-control"],
            "content-length": headers["content-length"],
            connection: headers.connection,
            "x-xss-protection": "0",
            "x-frame-options": "SAMEORIGIN",
            connection: "close",
        });
        res.status(status);
        data.pipe(res);
    })
);

module.exports = router;
