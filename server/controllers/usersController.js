const bcrypt = require("bcrypt");

const connection = require("../dbConnection");
const userSchema = require("../models/user");
const mapsController = require("../controllers/mapsController");
const chefsController = require("../controllers/chefsController");

const User = connection.model("User", userSchema);

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

// src: https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
const isValidEmailFormat = (email) => typeof email === "string" && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

const hashPassword = async (password) => await bcrypt.hash(password, SALT_ROUNDS);

const create = async ({ firstName, lastName, address, street, city, region, country, email, password, isChef, stripeId }) => {
    const hashedPassword = await hashPassword(password);
    let lat, lng, formattedAddress;
    if (address) {
        const location = await mapsController.getLocationCoordinates(address);
        lat = location.lat;
        lng = location.lng;
        formattedAddress = location.formattedAddress;
    }
    const { _doc } = await User.create({
        firstName,
        lastName,
        primaryAddress: {
            formattedAddress,
            street,
            city,
            region,
            postalCode: "",
            country,
            lat,
            lng,
        },
        bio: "",
        email,
        password: hashedPassword,
        isChef,
        favoriteCuisine: [],
        allergies: [],
    });
    if (isChef) {
        chef_doc = await chefsController.create({ userId: _doc._id, stripeId });
    }
    return _doc;
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
        const { lat, lng, formattedAddress } = await mapsController.getLocationCoordinates(
            [street, city, region, country].filter((ele) => ele && typeof ele === "string" && ele.length > 0).join(", ")
        );
        user.primaryAddress = {
            ...user.primaryAddress,
            lat,
            lng,
            formattedAddress,
        };
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

const checkPassword = async ({ user, password }) => await bcrypt.compare(password, user.password);

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
