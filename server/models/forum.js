import mongoose from "mongoose";

const forum = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
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
    replyCount: {
        type: Number,
        default: 0,
    },
    replies: [{
        type: mongoose.Types.ObjectId,
        ref: "Reply",
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
});

const Forum = mongoose.model("Forum", forum);
export default Forum;