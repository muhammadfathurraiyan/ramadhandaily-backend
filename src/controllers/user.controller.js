import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error!" });
  }
}

export async function createUser(req, res) {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const user = req.body;

  if (
    !user.name ||
    !user.email ||
    !user.password ||
    !user.role ||
    !user.password
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields!" });
  }

  try {
    const userExits = await User.findOne({ email: user.email });
    if (userExits.email === user.email) {
      return res
        .status(404)
        .json({ success: false, message: "Email already in use!" });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error!" });
  }

  const passwordHash = bcrypt.hashSync(user.password, saltRounds);

  const newUser = new User({
    ...user,
    password: passwordHash,
  });

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error!" });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid user id!" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error!" });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid user id!" });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted!" });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error!" });
  }
}
