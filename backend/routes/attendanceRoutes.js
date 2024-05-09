const express = require("express");
const { getAttendController, addAttendController, deleteAttendController } = require("../controllers/attendanceController");
const router = express.Router();

// Get attendance records
router.get("/get-attend", getAttendController);

// Add new attendance record
router.post("/add-attend", addAttendController);

// Delete attendance record
router.delete("/delete-attend/:attendId", deleteAttendController);

module.exports = router;
