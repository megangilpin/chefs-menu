const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    userId1: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userId2: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = conversationSchema;
