require("dotenv").config();
const mongoose = require("mongoose");
const usersController = require("../controllers/usersController");
const chefsDB = require("../models/chef");
const mealsController = require("../controllers/mealsController");
const chefsController = require("../controllers/chefsController");
const connection = require("../dbConnection");

// This file can empty and seed all the Users, Chefs, and Meals collections.

// Seed for users collection
// const userSeed = [
//     {
//         firstName: "Megan",
//         lastName: "Gilpin",
//         password: "1234",
//         email: "megangilpin@gmail.com",
//         primaryAddress: {
//             street: "3692 Broadway",
//             city: "New York",
//             region: "New York",
//             postalCode: "10031",
//             country: "United States",
//         },
//         isChef: true,
//     },
// ];
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

const chefsSeed = [
    {
        cuisineSpecialty: ["Indian", "Southern"],
    },
    {
        cuisineSpecialty: ["American", "Southern"],
    },
    {
        cuisineSpecialty: ["Japanese", "Southern"],
    },
    {
        cuisineSpecialty: ["Chinese", "Southern"],
    },
    {
        cuisineSpecialty: ["Korean", "Canadian"],
    },
];

// Seed for meals collection
const mealSeed = [
    {
        title: "Grilled cheese",
        chefId: "5fb7219ae114344091c47276",
        price: 1,
        servingSize: "1 person",
        cuisineType: ["American"],
        ingredients: "Bread with cheese",
    },
    {
        title: "Shawarma",
        price: 1,
        chefId: "5fb7219ae114344091c47277",
        servingSize: "1 person",
        cuisineType: ["Lebanese"],
        ingredients: "God's gift to the earth",
    },
    {
        title: "Big Mac",
        price: 1,
        chefId: "5fb7219ae114344091c47275",
        servingSize: "1 person",
        cuisineType: ["American"],
        ingredients: "bread with high calorie stuff in between",
    },
    {
        title: "Pizza",
        price: 1,
        chefId: "5fb7219ae114344091c47277",
        servingSize: "1 person",
        cuisineType: ["Italian"],
        ingredients: "Bread with cheese but better",
    },
    {
        title: "Roti",
        price: 1,
        chefId: "5fb7219ae114344091c47278",
        servingSize: "1 person",
        cuisineType: ["Indian"],
        ingredients: "Bread but thin and round ",
    },
];

(async () => {
    try {
        let res = await mealsController.deleteAll();
        console.log("deleteing all users", res);

        // res = await Promise.all(mealSeed.map(mealsController.create));
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
