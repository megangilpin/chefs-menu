const express = require("express");
const conversationsController = require("../controllers/conversationsController");
const messagesController = require("../controllers/messagesController");
const usersController = require("../controllers/usersController");
const { errorHandelingWrapper } = require("../util");

const router = express.Router();

router.post(
    "/",
    errorHandelingWrapper(async (req, res) => {
        // const userId1 = req.user;
        const { userId2, userId1 } = req.body;

        // check that user2 exists
        const errors = [];
        if (!userId2) errors.push("No user provided");
        const user2 = await usersController.findOneWithId(userId2);
        if (!user2) errors.push("No user provided");
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        // check if a convo already exists for users
        const conversation = await conversationsController.findOneWithUserId(
            userId1,
            userId2
        );

        if (conversation.length > 0) {
            return res.json(conversation);
        }

        const newConversation = await conversationsController.create({
            userId1,
            userId2,
        });

        return res.json(newConversation);
    })
);

// Add a message to a conversation
router.put(
    "/:id",
    errorHandelingWrapper(async (req, res) => {
        // const userId1 = req.user;
        const { id } = req.params;

        const { message, userId2, userId1 } = req.body;
        const sender = userId2;
        const receiver = userId1;

        const errors = [];
        if (!message) errors.push("No message sent");
        if (!userId2) errors.push("No user provided");
        const user2 = await usersController.findOneWithId(userId2);
        if (!user2) errors.push("Recipient is not a user");
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        // create message
        const savedMessage = await messagesController.create({
            receiver,
            sender,
            message,
        });

        const messageId = savedMessage._id;
        console.log(messageId);
        console.log(id);

        // Add message to conversation by conversation id
        const updatedConvo = await conversationsController.findAndUpdate(
            id,
            messageId
        );

        return res.json(updatedConvo);
    })
);

// Finds a conversation by conversation id and populates the messages and userId1 & userId1 profile info
router.get(
    "/:id",
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.params;
        const errors = [];

        const conversation = await conversationsController.findOneWithId(id);

        if (!conversation) errors.push("Conversation Does Not Exist");
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        res.json(conversation);
    })
);

// Finds all conversations by user id
router.get(
    "/",
    errorHandelingWrapper(async (req, res) => {
        // const id = req.user;
        const { id } = req.body;
        const errors = [];

        const conversations = await conversationsController.findAllWithUserId({
            id,
        });

        if (!conversations.length > 0) errors.push("No Conversations Exist");
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        return res.json(conversations);
    })
);

// Get all conversations
router.get(
    "/all/conversations",
    errorHandelingWrapper(async (req, res) => {
        const conversation = await conversationsController.findAll();
        return res.json(conversation);
    })
);

// Delete conversation by conversation id
router.delete(
    "/:id",
    errorHandelingWrapper(async (req, res) => {
        const { id } = req.params;

        const conversation = await conversationsController.remove(id);

        if (!conversation) {
            res.status(400).json({ errors: ["Conversation no longer exists"] });
            return;
        } else if (conversation._id) {
            res.json({ message: "Conversation successfully deleted" });
            return;
        }
    })
);

module.exports = router;

// {
//     "userId1": "5fc80855ca17dcdfded6d5c7",
//     "userId2": "5fc800c3b82cfedb6642b61f"
//   }

// {
//     "messages": [],
//     "_id": "5fc93aa17d12e6424d0c43c5",
//     "userId1": "5fc80855ca17dcdfded6d5c7",
//     "userId2": "5fc800c3b82cfedb6642b61f",
//     "createdAt": "2020-12-03T19:21:05.166Z",
//     "__v": 0
// }
