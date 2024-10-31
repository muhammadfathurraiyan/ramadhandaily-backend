import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export async function signIn(req, res) {
  const secretToken = process.env.SECRET_TOKEN;
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields!" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email or password invalid" });
    }

    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) {
      return res
        .status(404)
        .json({ success: false, message: "Email or password invalid" });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    };
    
    const newToken = jwt.sign(payload, secretToken, { expiresIn: 86400 });

    res.status(200).json({ success: true, data: payload, token: newToken });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error!" });
  }
}
