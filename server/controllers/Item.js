import Item from "../models/Item.js";
import AuthModel from "../models/Auth.js";

export const createItem = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthenticated" });
  }
  
  const user = await AuthModel.findById(userId);
  if (!user.businessId) {
    return res.status(401).json({ error: "You are not a business owner" });
  }
  const {
    title,
    category,
    images,
    videos,
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
      businessId: user.businessId,
      content,
      location,
      price,
      available_dates,
    });
    res.status(200).send(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const cat = req.query.category;
    const items = await Item.find(cat ? cat !== "all" ? { category: cat } : {} : {});
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

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
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
    })

    if (!items) {
      return res.status(500).json({ error: "Items not found!" });
    }

    res.status(200).send(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
