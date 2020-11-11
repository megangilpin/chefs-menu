const mongoose = require("mongoose");
const usersDB = require("../models/user");
const chefsDB = require("../models/chef");
const mealsDB = require("../models/meal");

// This file can empty and seed all the Users, Chefs, and Meals collections.

mongoose.connect("mongodb://localhost/chefsmenu", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

// Seed for users collection
const userSeed = 
  {
    firstName: "Megan",
    lastName: "Gilpin",
    password: 12345,
    email: "megangilpin@gmail.com",
    primaryAddress: {
      street: "3692 Broadway",
      city: "New York",
      region: "New York",
      postalCode: 10031,
      country: "United States",
    },
  }

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


//  insert into users collection
 usersDB
  .deleteMany({})
  .then(() => usersDB.insertMany(userSeed))
  .then(data => {
    console.log(data);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

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