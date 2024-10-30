import User from "../models/user.model";
import jwt from "jsonwebtoken";

const secretToken = process.env.SECRET_TOKEN;

export async function signIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields!" });
  }

  try {
    const user = await User.findOne({ email: email });
    
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const newToken = jwt.sign(payload, secretToken, { expiresIn: 86400 });

    res.status(200).json({ success: true, data: payload, token: newToken });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error!" });
  }
}
