require("dotenv").config();
const mongoose = require("mongoose");
const usersController = require("../controllers/usersController");
const chefsDB = require("../models/chef");
const mealsDB = require("../models/meal");
const connection = require("../dbConnection");

// This file can empty and seed all the Users, Chefs, and Meals collections.

// Seed for users collection
const userSeed = [
    {
        firstName: "Megan",
        lastName: "Gilpin",
        password: "1234",
        email: "megangilpin@gmail.com",
        primaryAddress: {
            street: "3692 Broadway",
            city: "New York",
            region: "New York",
            postalCode: "10031",
            country: "United States",
        },
        isChef: true,
    },
];
// Seed for chefs collection
// const chefsSeed = [
//   {
//     chefBio: {
//       tagLine: "Awarded Best Chef 10 years in a row!",
//       fullBio: "I have been a chef for over 20 years and love making people happy with great food",
//     },
//     cuisineSpecialty: ["American", "Southern"],
//   },
// ];

// Seed for meals collection
// const mealSeed =
//   {
//     title: "Grilled cheese",
//     price: 1,
//     servingSize: "1 person",
//     // cuisineType: ["American"],
//     ingredients: "Bread and american cheese",
//     requirements: {
//       hasReq: true,
//       list: "Spatula"
//     }
//   }

(async () => {
    try {
        let res = await usersController.deleteAll();
        console.log("deleteing all users", res);

        res = await Promise.all(userSeed.map(usersController.create));
        console.log("creating all users", res);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

//  insert into chefs collection
//  chefsDB
//   .deleteMany({})
//   .then(() => chefsDB.insertMany(chefsSeed))
//   .then(data => {
//     console.log(data);
//     // process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

//  insert into meals collection
// mealsDB
// .deleteMany({})
// .then(() => mealsDB.insertMany(mealSeed))
// .then(data => {
//   console.log(data);
//   process.exit(0);
// })
// .catch(err => {
//   console.error(err);
//   process.exit(1);
// });
