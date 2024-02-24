import Order from "../models/order.js";
import CartItem from "../models/cart.js";
import AuthModel from "../models/Auth.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  try {
    const { userId, booker_details } = req.body;
    const user = await AuthModel.findById(userId);
    const cartItemIds = user.cart;
    const cartItems = await CartItem.find({ _id: { $in: cartItemIds } });
    const items = cartItems.map((cartItem) => ({
      itemId: cartItem.itemId,
      selectedDate: cartItem.selectedDate,
      personsCount: 3,
      itemPrice: cartItem.totalPrice,
    }));
    const total_price = items.reduce((acc, item) => acc + item.itemPrice, 0);
    const newOrder = new Order({ userId, items, booker_details, total_price });
    await newOrder.save();
    await CartItem.deleteMany({ _id: { $in: cartItemIds } });
    await AuthModel.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true }
    );
    await AuthModel.findByIdAndUpdate(
      userId,
      { $push: { orders: newOrder._id } },
      { new: true }
    );
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const Orders = await Order.find({ userId: req.userId });
    res.status(200).json(Orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, items, booker_details, total_price } = req.body;
    const updatedOrder = { userId, items, booker_details, total_price };
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Order with id: ${id}`);
    }
    const orderUpdate = await Order.findByIdAndUpdate(id, updatedOrder, {
      new: true,
    });
    res.json(orderUpdate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Order with id: ${id}`);
    }
    await Order.findByIdAndRemove(id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOrdersByBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    const Orders = await Order.find().populate("items.itemId", "businessId");
    const businessOrders = Orders.filter(
      (Order) => Order.items.itemId.businessId === businessId
    );
    res.status(200).json(businessOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOrdersByItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const orders = await Order.find().populate("items.itemId");
    const itemOrders = orders.filter((Order) => Order.items.itemId === itemId);
    res.status(200).json(itemOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
