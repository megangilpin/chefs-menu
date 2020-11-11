const Schema = require("mongoose").Schema;

const userSchema = new Schema({
    email: String,
    password: String,
});

module.exports = userSchema;
