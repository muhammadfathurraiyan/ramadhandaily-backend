import express from "express";
import { signUp } from "../controllers/signup.controller.js";
import { signIn } from "../controllers/signin.controller.js";

const router = express.Router();

router.post("/", signUp, signIn);

export default router;
