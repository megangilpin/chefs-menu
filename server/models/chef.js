const mongoose = require("mongoose");
const { Schema } = mongoose;

const chefSchema = new Schema({
    cuisineSpecialty: [{ type: String, required: true }],
    // To Do: structure availability : commenting out till we find a solution
    // availability: {
    //     date: { type: Date },
    //     time: { type: Number },
    // },
    userId: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = chefSchema;
