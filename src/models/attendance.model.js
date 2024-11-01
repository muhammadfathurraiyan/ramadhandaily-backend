import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    fast: {
      type: Boolean,
      required: true,
      default: true,
    },
    maghreeb: {
      type: Boolean,
      default: false,
    },
    isya: {
      type: Boolean,
      default: false,
    },
    subh: {
      type: Boolean,
      default: false,
    },
    dzuhr: {
      type: Boolean,
      default: false,
    },
    ashr: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
