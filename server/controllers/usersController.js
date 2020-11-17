const bcrypt = require("bcrypt");

const connection = require("../dbConnection");
const userSchema = require("../models/user");

const User = connection.model("User", userSchema);

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

// src: https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
const isValidEmailFormat = (email) =>
    typeof email === "string" &&
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

const hashPassword = async (password) =>
    await bcrypt.hash(password, SALT_ROUNDS);

const create = async ({ email, password }) => {
    const hashedPassword = await hashPassword(password);
    const { _doc } = await User.create({ email, password: hashedPassword });
    return _doc
};

const update = async (id, requestBody) => {
    const {
        firstName,
        lastName,
        password,
        email,
        primaryAddress,
        primaryPhone,
        profilePicURL,
        bio,
        favoriteCuisine,
        allergies,
        isChef,
    } = requestBody;
    const { street, city, region, postalCode, country } = primaryAddress || {};

    const user = await User.findOne({ _id: id });

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (password) user.password = await hashPassword(password);
    if (email) user.email = email;
    if (primaryAddress) {
        if (street) user.primaryAddress.street = street;
        if (city) user.primaryAddress.city = city;
        if (region) user.primaryAddress.region = region;
        if (postalCode) user.primaryAddress.postalCode = postalCode;
        if (country) user.primaryAddress.country = country;
    }
    if (primaryPhone) user.primaryPhone = primaryPhone;
    if (profilePicURL) user.profilePicURL = profilePicURL;
    if (bio) user.bio = bio;
    if (favoriteCuisine) user.favoriteCuisine = favoriteCuisine;
    if (allergies) user.allergies = allergies;
    if (isChef) user.isChef = isChef;

    const { _doc } = (await user.save()) || {};
    return _doc;
};

const findOneWithEmail = async (email) => {
    const { _doc } = (await User.findOne({ email })) || {};
    return _doc;
};

const findOneWithId = async (id) => {
    const { _doc } = (await User.findById(id)) || {};
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
    update,
    isValidEmailFormat,
};
