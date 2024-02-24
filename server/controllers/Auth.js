import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../models/Auth.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
// Register
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      birthday,
      state,
      country,
      postalCode,
      phoneNumber,
      address,
      city,
    } = req.body;

    // Check if the user exists
    const oldUser = await AuthModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exists with this email");
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await AuthModel.create({
      name,
      email,
      hashedPassword: encryptedPassword,
      birthday,
      state,
      country,
      city,
      postalCode,
      phoneNumber,
      address,
    });

    // Create token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(404).send("User doesn't exist");
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid credentials");
    }

    // Create token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(404).send("User doesn't exist");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    user.hashedPassword = encryptedPassword;
    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User doesn't exist");
    }

    user.approved = true;

    await user.save();

    res.redirect(process.env.FRONTEND_URI);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}