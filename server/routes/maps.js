const express = require("express");

const { errorHandelingWrapper, drawCirclePath } = require("../util");
const { loginRequired } = require("../middleware");
const userController = require("../controllers/usersController");
const mapsController = require("../controllers/mapsController");

const router = express.Router();

router.get(
    "/autocomplete",
    errorHandelingWrapper(async (req, res) => {
        const { input } = req.query;
        const predictions = await mapsController.getAutoCompletePredictions(input);
        res.json({ predictions });
    })
);

router.get(
    "/static",
    loginRequired,
    errorHandelingWrapper(async (req, res) => {
        let { center } = req.query;
        const { id } = req.user;

        const user = await userController.findOneWithId(id);
        // if no center is provided use the users address
        if (!center) {
            const {
                primaryAddress: { city, region, country },
            } = user;
            center = city + "," + region;
            if (country) center = center + "," + country;
        }

        const {
            primaryAddress: { lat, lng },
        } = user;

        let circlePath;
        if (lat && lng) {
            center = [lat, lng].join(',');
            circlePath = `fillcolor:0xff00002D|color:0xf96332ff|enc:${drawCirclePath(lat, lng, 3)}`;
        }

        const { status, headers, data } = await mapsController.getStaticMapImage(center, circlePath);

        res.set(headers);
        res.status(status);
        data.pipe(res);
    })
);

module.exports = router;
