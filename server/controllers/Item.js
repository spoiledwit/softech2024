import Item from "../models/item.js";

export const createItem = async (req, res) => {
  const {
    title,
    category,
    images,
    videos,
    businessId,
    content,
    location,
    price,
    available_dates,
  } = req.body;
  try {
    const item = await Item.create({
      title,
      category,
      images,
      videos,
      businessId,
      content,
      location,
      price,
      available_dates,
    });
    res.status(200).send(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(500).json({ error: "Item not found!" });
    }
    res.status(200).send(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getItemByBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    const items = await Item.find({
      businessId,
    });

    if (!items) {
      return res.status(500).json({ error: "Items not found!" });
    }

    res.status(200).send(items);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { review, rating } = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No item with id: ${id}`);
    }
    const item = Item.findById(id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    item.reviews.push({ userId, review, rating });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}