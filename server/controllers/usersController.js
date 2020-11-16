const bcrypt = require("bcrypt");

const connection = require("../dbConnection");
const userSchema = require("../models/user");

const User = connection.model("User", userSchema);

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const create = async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const { _doc } = await User.create({ email, password: hashedPassword });
    return _doc;
};

const findOneWithEmail = async (email) => {
    const { _doc } = await User.findOne({ email });
    return _doc;
};

const findOneWithId = async (id) => {
    const { _doc } = await User.findOne({ _id: id });
    return _doc;
};

const checkPassword = async ({ user, password }) =>
    await bcrypt.compare(password, user.password);

const deleteAll = async () => await User.deleteMany({});

const sanatize = async (user) => ({ ...user, password: undefined });

module.exports = {
    create,
    findOneWithEmail,
    checkPassword,
    deleteAll,
    findOneWithId,
    sanatize,
};
