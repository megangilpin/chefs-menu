const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = messageSchema;
