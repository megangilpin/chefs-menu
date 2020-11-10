const connection = require("../dbConnection");

// CONTROLLER FOR USER MODEL

const userSchema = require("../models/user");
const User = connection.model("User", userSchema);

const create = async ({ email, password }) => {
    // TODO hash password before saving to DB
    const user = await User.create({ email, password });
    return user;
};

const findOneWithemail = async (email) => await User.findOne({ email });

// Defining methods for the usersController
module.exports = { create, findOneWithemail };
