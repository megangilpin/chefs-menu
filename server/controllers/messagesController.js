const connection = require("../dbConnection");
const messageSchema = require("../models/message");

const Message = connection.model("Message", messageSchema);

const create = async ({ sender, receiver, message }) => {
    const data = await Message.create({ sender, receiver, message });
    return data;
};

const findAllMessages = async () => {
    const messages = await Message.find();
    return messages;
};

// Finds message with message id
const findOneWithId = async (id) => {
    const data = await Message.findById(id);
    return data;
};

// Finds message with message id
const findAllWithSender = async ({ sender: id }) => {
    const data = await Message.find({ sender: id });
    return data;
};

const deleteAll = async () => {
    await Message.deleteMany();
};

module.exports = {
    create,
    findOneWithId,
    findAllWithSender,
    findAllMessages,
    deleteAll,
};
