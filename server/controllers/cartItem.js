import CartItem from "../models/cart";
import AuthModel from "../models/Auth";

export const addItemToCart = async (req, res) => {
    try {
        const { itemId, selectedDate, persons, totalPrice } = req.body;
        const newCartItem = new CartItem({ itemId, selectedDate, persons, totalPrice });
        const user = await AuthModel.findById(req.userId);
        user.cart.push(newCartItem);
        await user.save();
        await newCartItem.save();
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getCartItems = async (req, res) => {
    try {
        const user = await AuthModel.findById(req.userId).populate("cart");
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        const cartItem = await CartItem.findById(id);
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { itemId, selectedDate, persons, totalPrice } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No cartItem with id: ${id}`);
    const updatedCartItem = { itemId, selectedDate, persons, totalPrice, _id: id };
    res.json(updatedCartItem);
}

export const removeItemFromCats = async (req, res) => {
    try {
        const user = await AuthModel.findById(req.userId);
        user.cart = user.cart.filter((cartItem) => cartItem._id !== req.params.id);
        await user.save();

        const deletedCartItem = await CartItem.findByIdAndRemove(req.params.id);

        res.json(deletedCartItem);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}