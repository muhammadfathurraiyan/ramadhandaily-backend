import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import signUpRoutes from "./routes/signup.route.js";
import signinRoutes from "./routes/signin.route.js";
import { jwtVerify } from "./middleware/auth.middleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/signin", signinRoutes);
app.use("/signup", signUpRoutes);
app.use("/users", jwtVerify, userRoutes);
app.use("/attendances", jwtVerify, userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
