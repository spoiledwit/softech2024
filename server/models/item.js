import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Types.objectId, ref: "Item",
    required: true
  },
  title: { type: String, required: true },
  category: { type: String, enum: ["historical_sights", "natural_wonders", "cultural_attractions", "adeventure_spots"], required: true },
  city: { type: String, required: true },
  images: { type: [String], required: true },
  videos: { type: [String], required: true },
  content: [
    {
      title: { type: String, required: true },
      markdown: { type: String, required: true },
    },
  ],
  price: { type: Number, required: true },
  reviews: [
    {
      user_id: { type: String, required: true },
      review: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  ],
  available_dates: {
    all_available: { type: Boolean, required: true },
    dates: { type: [Date], required: true },
  },
},
  {
    timestamps: true,
  }
);

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);