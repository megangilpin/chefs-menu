const express = require("express");
const conversationsController = require("../controllers/conversationsController");
const messagesController = require("../controllers/messagesController");
const usersController = require("../controllers/usersController");
const { errorHandelingWrapper } = require("../util");

const router = express.Router();

router.post(
    "/",
    errorHandelingWrapper(async (req, res) => {
        const userId1 = req.user.id;
        const { userId2 } = req.body;

        // Checks that user2 exists
        const errors = [];
        if (!userId2) errors.push("No user provided");
        const user2 = await usersController.findOneWithId(userId2);
        if (!user2) errors.push("No user provided");
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        // Check if a convo already exists for users
        const conversation = await conversationsController.findOneWithUserId(
            userId1,
            userId2
        );
        if (conversation.length > 0) {
            return res.json(conversation);
        }

        // Otherwise create convo
        await conversationsController.create({
            userId1,
            userId2,
        });
        const newConversation = await conversationsController.findOneWithUserId(
            userId1,
            userId2
        );

        return res.json(newConversation);
    })
);

// Add a message to a conversation with conversation id
router.put(
    "/:id",
    errorHandelingWrapper(async (req, res) => {
        // Conversation id
        const { id } = req.params;
        const { message, sender, receiver } = req.body;
        const errors = [];

        if (!message) errors.push("No message provided");
        if (!sender) errors.push("No sender provided");
        if (!receiver) errors.push("No receiver provided");
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        // Create message
        const savedMessage = await messagesController.create({
            receiver,
            sender,
            message,
        });

        const messageId = savedMessage._id;

        // Add message to conversation by conversation id
        await conversationsController.findAndUpdate(
            id,
            messageId
        );

        const updatedConvo = await conversationsController.findOneWithId(id);

        return res.json(updatedConvo);
    })
);

// Finds a conversation by conversation id and populates the messages and userId1 & userId2 profile info
router.get(
    "/:id",
    errorHandelingWrapper(async (req, res) => {
        // Conversation id
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
        const { id } = req.user;

        const conversations = await conversationsController.findAllWithUserId({
            id,
        });

        return res.json(conversations);
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
