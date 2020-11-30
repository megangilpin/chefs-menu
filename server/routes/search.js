// ROUTER FOR SEARCHING
const router = require("express").Router();

const chefsController = require("../controllers/chefsController");
const mealsController = require("../controllers/mealsController");
const userController = require("../controllers/usersController");
const { errorHandelingWrapper, coordinatesDistanceCalc } = require("../util");

router.get(
    "/",
    errorHandelingWrapper(async (req, res) => {
        if (!["chefs", "meals"].includes(req.query.searchType)) {
            res.status(400).json({ errors: ["searchType should be one of chefs or meals!"] });
            return;
        }
        const { id } = req.user;
        const { primaryAddress } = await userController.findOneWithId(id);
        const { lat, lng } = primaryAddress || {};
        if (req.query.searchType === "chefs") {
            let { radiusKm } = req.query;
            radiusKm = radiusKm && Number(radiusKm);
            const query = req.query.cuisine
                ? { cuisineSpecialty: { $in: req.query.cuisine.split(",").map(c => RegExp(c, 'i')) } }
                : {};
            const chefs = (await chefsController.findAllChefs(query))
                .filter((chef) => chef.userId && chef.userId.primaryAddress)
                .map((chef) => {
                    const {
                        userId: { primaryAddress },
                    } = chef;
                    const distanceKm = coordinatesDistanceCalc(
                        lat,
                        lng,
                        primaryAddress.lat,
                        primaryAddress.lng
                    );
                    return { ...chef._doc, distanceKm };
                })
                .filter((chef) => {
                    if (!radiusKm) return true;
                    return chef.distanceKm < radiusKm;
                });

            if (!query) {
                res.json(chefs);
                return;
            }
            const meals = await mealsController.findAllMeals({
                chefId: { $in: chefs.map((chef) => chef._id) },
            });

            chefMeals = {};
            chefs.forEach((chef) => (chefMeals[chef._id] = []));
            meals.forEach((meal) => chefMeals[meal.chefId].push(meal));
            res.json({ chefs, chefMeals });
        }

        if (req.query.searchType === "meals") {
            const query = req.query.cuisine
                ? { cuisineType: { $in: req.query.cuisine.split(",").map(c => RegExp(c, 'i')) } }
                : {};
            const meals = await mealsController.findAllMeals(query);
            if (!query) {
                res.json(chefs);
            }
            const chefs = await chefsController.findAllChefs({
                _id: { $in: meals.map((meal) => meal.chefId) },
            });

            const chefIndex = {};
            chefs.forEach((chef) => (chefIndex[chef._id] = chef));
            meals.forEach((meal) => (meal["chefId"] = chefIndex[meal.chefId]));
            res.json({ meals });
        }
    })
);

module.exports = router;
