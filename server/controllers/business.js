import Business from "../models/business.js";
import mongoose from "mongoose"

export const createBusiness = async (req, res) => {

    try {
        const { name } = req.body;
        const newBusiness = new Business({
            name,
            userId: req.userId
        });
        await newBusiness.save();
        res.status(201).json(newBusiness);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.status(200).json(businesses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBusiness = async (req, res) => {
    const { id } = req.params;
    try {
        const business = await Business.findById(id);
        res.status(200).json(business);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateBusiness = async (req, res) => {
    const { id } = req.params;
    const business = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No business with id: ${id}`);
    const updatedBusiness = await Business.findByIdAndUpdate(id, { ...business, id }, { new: true });
    res.json(updatedBusiness);
}

export const deleteBusiness = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No business with id: ${id}`);
    await Business.findByIdAndRemove(id);
    res.json({ message: "Business deleted successfully." });
}