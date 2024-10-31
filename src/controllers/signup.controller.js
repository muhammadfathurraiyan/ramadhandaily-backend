import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function signUp(req, res, next) {
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
    const userExist = await User.findOne({ email: user.email });
    if (userExist?.email === user?.email) {
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
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error!" });
  }

  next();
}
