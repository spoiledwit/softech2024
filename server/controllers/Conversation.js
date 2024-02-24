import Conversation from "../models/Conversation.js";

export const getMyConversations = async (req, res) => {
    try {
        const userId = req.userId;
        const conversation = await Conversation.find({
            members: {
                $in: [userId],
            },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.params.senderId, req.params.receiverId],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteConversation = async (req, res) => {
    try {
        await Conversation.findOneAndDelete({
            id: req.params.id,
        })
        res.status(200).json("Conversation has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}
