import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../models/Auth.js";
import dotenv from "dotenv";
dotenv.config();

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
      preferences,
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
      preferences,
    });

    // Create token
    const token = jwt.sign(
      { email: AuthModel.email, id: AuthModel._id },
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
      AuthModel.hashedPassword
    );

    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid credentials");
    }

    // Create token
    const token = jwt.sign(
      { email: AuthModel.email, id: AuthModel._id },
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

    AuthModel.hashedPassword = encryptedPassword;
    await AuthModel.save();

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

    AuthModel.approved = true;

    await AuthModel.save();

    res.redirect(process.env.FRONTEND_URI);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const toggleWishlistItem = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AuthModel.findById(req.userId);
    const index = user.wishlist.findIndex((id) => id === String(id));
    if (index === -1) {
      user.wishlist.push(id);
    } else {
      user.wishlist = user.wishlist.filter((id) => id !== String(id));
    }
    await user.save();
    res.status(200).json(user);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};