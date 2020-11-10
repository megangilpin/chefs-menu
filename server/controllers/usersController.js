const bcrypt = require("bcrypt");

const connection = require("../dbConnection");
const userSchema = require("../models/user");

const User = connection.model("User", userSchema);

const create = async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS);
    const user = await User.create({ email, password: hashedPassword });
    return user;
};

const findOneWithemail = async (email) => await User.findOne({ email });

module.exports = { create, findOneWithemail };
