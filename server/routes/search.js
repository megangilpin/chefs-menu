// ROUTER FOR SEARCHING
const router = require("express").Router();
const chefsController = require("../controllers/chefsController");
const mealsController = require("../controllers/mealsController");


router.get("/", async (req, res) => {



    if (! ["chefs", "meals"].includes(req.query.searchType)) {
        res.status(400).json({ errors: ["searchType should be one of chefs or meals!"] });
        return;
    } 

    if (req.query.searchType === "chefs"){

        const query = req.query.cuisine ?  {cuisineSpecialty: {$in: req.query.cuisine.split(',')}} : {}
        chefs = await chefsController.findAllChef(query);
        chefs.forEach(chef => chef["meals"] = mealsController.findAllMeals( { chefId: chef._id }));
        res.json(chefs);
    }
    if (req.query.searchType === "meals"){

        const query = req.query.cuisine ?  {cuisineType: {$in: req.query.cuisine.split(',')}} : {}
        meals = await mealsController.findAllMeals(query);
        const chefs = {};
        meals.forEach(meal => {
            let chef = chefsController.findOneWithId(meal.chefId);
            chefs[chef._id] = chef;
        })
        
        res.json({meals: meals, chefs});
    }
    return;
    
    
    })






module.exports = router;