const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    primaryAddress: {
        street: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
    },
    primaryPhone: Number,
    profilePicURL: String,
    bio: String,
    favoriteCuisine: [{ type: String }],
    allergies: String,
    isChef: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = userSchema;
