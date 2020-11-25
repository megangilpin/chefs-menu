// ROUTER FOR SEARCHING
const router = require("express").Router();
const chefsController = require("../controllers/chefsController");
const mealsController = require("../controllers/mealsController");

router.get("/", async (req, res) => {
    if (!["chefs", "meals"].includes(req.query.searchType)) {
        res.status(400).json({ errors: ["searchType should be one of chefs or meals!"] });
        return;
    }

    if (req.query.searchType === "chefs") {
        const query = req.query.cuisine 
            ? { cuisineSpecialty: { $in: req.query.cuisine.split(",") } } 
            : {};
        chefs = await chefsController.findAllChefs(query);
        if (!query) {
            res.json(chefs);
            return
        }
        meals = await mealsController.findAllMeals(
            { chefId: { $in: chefs.map((chef) => chef._id) } });
        
        chefMeals = {}
        chefs.forEach(chef=> chefMeals[chef._id] = []);
        meals.forEach(meal => chefMeals[meal.chefId].push(meal));
        res.json({ chefs, chefMeals });
        }
      
    
       
    if (req.query.searchType === "meals") {
        const query = req.query.cuisine ? { cuisineType: { $in: req.query.cuisine.split(",") } } : {};
        meals = await mealsController.findAllMeals(query);
        if (!query) {
            res.json(chefs);
        }
        const chefs = await chefsController.findAllChefs(
            { _id: { $in: meals.map((meal) => meal.chefId) } });
        
        const chefIndex = {}
        chefs.forEach(chef => chefIndex[chef._id] = chef)
        meals.forEach(meal => meal["chefId"]= chefIndex[meal.chefId])

        res.json({ meals  });

    }
    
    return;
});

module.exports = router;
