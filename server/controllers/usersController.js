const bcrypt = require("bcrypt");

const connection = require("../dbConnection");
const userSchema = require("../models/user");

const User = connection.model("User", userSchema);

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const create = async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ email, password: hashedPassword });
    return user;
};

const findOneWithEmail = async (email) => await User.findOne({ email });

const checkPassword = async ({ user, password }) =>
    await bcrypt.compare(password, user.password);

const deleteAll = async () => await User.deleteMany({});

module.exports = { create, findOneWithEmail, checkPassword, deleteAll };
