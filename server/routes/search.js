// ROUTER FOR SEARCHING
const router = require("express").Router();

const chefsController = require("../controllers/chefsController");
const mealsController = require("../controllers/mealsController");
const userController = require("../controllers/usersController");
const { errorHandelingWrapper, coordinatesDistanceCalc } = require("../util");

router.get(
    "/",
    errorHandelingWrapper(async (req, res) => {
        const { searchType, cuisine } = req.query;
        let { radiusKm } = req.query;

        if (!["chefs", "meals"].includes(searchType)) {
            res.status(400).json({ errors: ["searchType should be one of chefs or meals!"] });
            return;
        }
        const cuisineQuery = cuisine && { $in: cuisine.split(",").map((c) => RegExp(c, "i")) };
        radiusKm = radiusKm && Number(radiusKm);

        if (searchType === "chefs") {
            const { id } = req.user;
            const { primaryAddress } = await userController.findOneWithId(id);
            const { lat, lng } = primaryAddress || {};
            const query = cuisine ? { cuisineSpecialty: cuisineQuery } : {};
            const chefs = (await chefsController.findAllChefs(query))
                .filter((chef) => chef.userId && chef.userId.primaryAddress)
                .map((chef) => ({
                    ...chef._doc,
                    distanceKm: coordinatesDistanceCalc(
                        lat,
                        lng,
                        chef.userId.primaryAddress.lat,
                        chef.userId.primaryAddress.lng
                    ),
                }))
                .filter((chef) => radiusKm && chef.distanceKm < radiusKm);

            res.json({ chefs });
        }

        if (searchType === "meals") {
            const query = cuisine ? { cuisineType: cuisineQuery } : {};
            const meals = await mealsController.findAllMeals(query);
            res.json({ meals });
        }
    })
);

module.exports = router;
