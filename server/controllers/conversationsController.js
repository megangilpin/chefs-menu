const connection = require("../dbConnection");
const conversationSchema = require("../models/conversation");

const Conversation = connection.model("Conversation", conversationSchema);

// Create conversation
const create = async ({ userId1, userId2 }) => {
    const data = await Conversation.create({ userId1, userId2 });
    return data;
};

// Find one with Conversation id
const findOneWithId = async (id) => {
    const data = await Conversation.findById(id)
        .populate("messages")
        .populate({
            path: "userId1",
            select:
                "firstName lastName email primaryPhone profilePicURL isChef",
        })
        .populate({
            path: "userId2",
            select:
                "firstName lastName email primaryPhone profilePicURL isChef",
        });
    return data;
};

// Finds all by user Id
const findAllWithUserId = async ({ id }) => {
    const data = await Conversation.find()
        .or([{ userId1: id }, { userId2: id }])
        .populate({
            path: "userId1",
            select:
                "firstName lastName email primaryPhone profilePicURL isChef",
        })
        .populate({
            path: "userId2",
            select:
                "firstName lastName email primaryPhone profilePicURL isChef",
        });
    return data;
};

// Finds one with both users
const findOneWithUserId = async (userId2, userId1) => {
    const data = await Conversation.find()
        .and([
            { $or: [{ userId1: userId1 }, { userId2: userId1 }] },
            { $or: [{ userId1: userId2 }, { userId2: userId2 }] },
        ])
        .populate("messages")
        .populate({
            path: "userId1",
            select:
                "firstName lastName email primaryPhone profilePicURL isChef",
        })
        .populate({
            path: "userId2",
            select:
                "firstName lastName email primaryPhone profilePicURL isChef",
        })
        .exec();
    return data;
};

// Finds by conversation id and updates with message id
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

// Finds all conversations
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
    findAll,
    findOneWithId,
    findAllWithUserId,
    findOneWithUserId,
    remove,
    deleteAll,
};
