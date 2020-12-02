const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    // Which is better?
    // option A
    userId1: { type: Schema.Types.ObjectId, ref: "User" },
    userId2: { type: Schema.Types.ObjectId, ref: "User" },
    // option B
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = conversationSchema;
