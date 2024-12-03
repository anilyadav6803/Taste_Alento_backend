import { Request, Response } from "express";
import User from "../models/user";

// Get the current user
const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(currentUser);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a new user
const createCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      res.status(200).json({ message: "User already exists" });
      return;
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// Update the current user
const updateCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    Object.assign(user, { name, addressLine1, country, city });
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
