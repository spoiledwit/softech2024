import mongoose from "mongoose";

const replySchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }],
    disliks: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    forumId: {
        type: mongoose.Types.ObjectId,
        ref: "Forum",
        required: true,
    }
}, {
    timestamps: true,
});

const Reply = mongoose.model("Reply", replySchema);
export default Reply;