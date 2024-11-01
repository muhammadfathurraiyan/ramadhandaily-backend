import express from "express";
import {
  createAttendance,
  getAttendances,
  updateAttendance,
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.get("/", getAttendances);
router.post("/", createAttendance);
router.patch("/:id", updateAttendance);

export default router;
