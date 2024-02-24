import Item from "../models/Item.js";

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
