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
    try {
        const { name } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No business with id: ${id}`);
        }
        const business = Business.find({
            userId: req.userId
        });

        if (!business) {
            return res.status(404).send("Business not found");
        }

        business.name = name;
        await business.save();
        res.json(business);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No business with id: ${id}`);
        }
        await Business.findByIdAndRemove(id);
        res.json({ message: "Business deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}