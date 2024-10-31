import express from "express";
import { signIn } from "../controllers/signin.controller.js";

const router = express.Router();

router.post("/", signIn);

export default router;
