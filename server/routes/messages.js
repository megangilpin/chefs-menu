const express = require("express");
const conversationsController = require("../controllers/conversationsController");
const messagesController = require("../controllers/messagesController");
const usersController = require("../controllers/usersController");
const { errorHandelingWrapper } = require("../util");

const router = express.Router();

router.post(
    "/",
    errorHandelingWrapper(async (req, res) => {
        const userId1 = req.user;
        const { userId2 } = req.body;

        // check that user2 exists
        const errors = [];
        if (!userId2) errors.push("No user provided");
        const user2 = await usersController.findOneWithId(userId2);
        if (!user2) errors.push("No user provided");
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const conversation = await conversationsController.create({
            userId1,
            userId2,
        });

        res.json(conversation);
    })
);

// Get by conversation id and populate messages and sender/receiver user info
router.get(
    "/:id",
    errorHandelingWrapper(async (req, res) => {
        // const userId1 = req.user;
        const { id } = req.params;

        const conversation = await conversationsController.findOneWithId(id);

        res.json(conversation);
    })
);

// Get all conversations by user id and populate messages
router.get(
    "/",
    errorHandelingWrapper(async (req, res) => {
        // const id = req.user;
        const { id } = req.body;

        const conversation = await conversationsController.findAllWithUserId({
            id,
        });
        res.json(conversation);
    })
);

// Get all conversations
router.get(
    "/all/conversations",
    errorHandelingWrapper(async (req, res) => {
        const conversation = await conversationsController.findAll();
        res.json(conversation);
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

        res.json(updatedConvo);
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
//     "userId1": "5fc800c3b82cfedb6642b61f",
//     "userId2": "5fc80855ca17dcdfded6d5c7",
//     "message": "hello"
//   }

// {
//     "userId1": "5fc80855ca17dcdfded6d5c7",
//     "userId2": "5fc800c3b82cfedb6642b61f"
//   }

// {
//     "messages": [],
//     "_id": "5fc8d2d31a3bd90d82e85652",
//     "userId1": "5fc800c3b82cfedb6642b61f",
//     "userId2": "5fc80855ca17dcdfded6d5c7",
//     "createdAt": "2020-12-03T11:58:11.227Z",
//     "__v": 0
// },

// 5fc8d2d31a3bd90d82e85652
