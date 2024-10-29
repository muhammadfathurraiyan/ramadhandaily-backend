import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
