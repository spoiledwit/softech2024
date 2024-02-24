import Complaint from "../models/complaint.js";

export const createComplaint = async (req, res) => {
    try {
        const { message, itemId, businessId } = req.body;
        const userId = req.userId;
        const complaint = new Complaint({ userId, message, itemId, businessId });
        await complaint.save();
        res.status(201).json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getComplaintsByUser = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            userId: req.userId
        }).populate("itemId").populate("userId");

        res.status(200).json(complaints);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        await Complaint.findByIdAndDelete(id);
        res.status(200).json("Complaint has been deleted");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getComplaintsByBusiness = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            businessId: req.params.id
        }).populate("itemId").populate("userId");

        res.status(200).json(complaints);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const analytics = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            businessId: req.params.id
        })

        res.status(200).json(complaints.length);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}