const express = require("express");
const axios = require("axios");

const { errorHandelingWrapper } = require("../util");
const { loginRequired } = require("../middleware");
const userController = require("../controllers/usersController");

const router = express.Router();

router.get(
    "/autocomplete",
    errorHandelingWrapper(async (req, res) => {
        const { input } = req.query;
        const url =
            "https://maps.googleapis.com/maps/api/place/autocomplete/json" +
            `?input=${input}` +
            `&key=${process.env.GOOGLE_MAPS_API_KEY}`;

        const { data } = await axios.get(url);
        const predictions = data.predictions.map(
            ({ description }) => description
        );
        res.json({ predictions });
    })
);

router.get(
    "/static",
    loginRequired,
    errorHandelingWrapper(async (req, res) => {
        let { center } = req.query;
        const { id } = req.user;

        // if no center is provided use the users address
        if (!center) {
            const user = await userController.findOneWithId(id);
            const {
                primaryAddress: { city, region, country },
            } = user;
            center = city + "," + region;
            if (country) center = center + "," + country;
        }

        const url =
            "https://maps.googleapis.com/maps/api/staticmap" +
            `?center=${center}` +
            "&scale=2&zoom=13&size=600x300&maptype=roadmap" +
            `&key=${process.env.GOOGLE_MAPS_API_KEY}`;

        const { headers, data, status } = await axios({
            method: "get",
            url,
            responseType: "stream",
        });

        res.set(headers);
        res.status(status);
        data.pipe(res);
    })
);

module.exports = router;
