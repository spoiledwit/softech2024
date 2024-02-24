import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        userd: { type: mongoose.Types.ObjectId, required: true, ref: "Auth" },
        review: { type: String, required: true },
        rating: { type: Number, required: true },
        itemId: { type: mongoose.Types.ObjectId, required: true, ref: "Item" },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
