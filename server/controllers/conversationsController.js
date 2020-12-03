const connection = require("../dbConnection");
const conversationSchema = require("../models/conversation");

const Conversation = connection.model("Conversation", conversationSchema);

// Create conversation
const create = async ({ userId1, userId2 }) => {
    const { _doc } = (await Conversation.create({ userId1, userId2 })) || {};
    return _doc;
};

// Find one with Conversation id
const findOneWithId = async (id) => {
    const data = await Conversation.findById(id)
        .populate("messages")
        .populate("userId1")
        .populate("userId2");
    return data;
};

// Find all by userId1 or userId2
const findAllWithUserId = async ({ id }) => {
    const data = await Conversation.find()
        .or([{ userId1: id }, { userId2: id }])
        .populate("messages")
        .populate({
            path: "messages",
            // match: { _id: { $ne: id } },
        })
        .populate({
            path: "receiver",
            // match: { _id: { $ne: id } },
        });
    return data;
};

// Find conversation id and update with message id
const findAndUpdate = async (id, messageId) => {
    const data = await Conversation.findByIdAndUpdate(
        id,
        { $addToSet: { messages: [messageId] } },
        {
            new: true,
        }
    );
    return data;
};

// Find all conversations
const findAll = async () => {
    const messages = await Conversation.find({});
    return messages;
};

// Delete by conversation id
const remove = async (id) => {
    return await Conversation.findByIdAndDelete(id);
};

// Delete all conversations
const deleteAll = async () => {
    await Conversation.deleteMany();
};

module.exports = {
    create,
    findAndUpdate,
    findOneWithId,
    findAllWithUserId,
    findAll,
    remove,
    deleteAll,
};
