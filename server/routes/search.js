// ROUTER FOR SEARCHING
const router = require("express").Router();
const chefsController = require("../controllers/chefsController");
const mealsController = require("../controllers/mealsController");

// get all chefs for certain cusine
router.get("/", async (req, res) => {

    if (! ["chefs", "meals"].includes(req.query.searchType)) {
        res.status(400).json({ errors: ["searchType should be one of chefs or meals!"] });
        return;
    } 

    if (req.query.searchType === "chefs"){
        const query = req.query.cusine ?  {cuisineSpecialty: {$all: [req.query.cusine]}} : {}
        chefs = await chefsController.findAllChef(query);
        res.json(chefs);
    }
    if (req.query.searchType === "meals"){
        const query = req.query.cusine ?  {cusineType: {$all: [req.query.cusine]}} : {}
        meals = await mealsController.findAllMeals(query);
        res.json(meals);
    }
    return;
    
    
    })






module.exports = router;