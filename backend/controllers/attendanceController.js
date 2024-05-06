const attends = require("../models/attendanceModel");
const attendModel = require("../models/attendanceModel");

const getAttendController = async (_req, res) => {
  try {
    const attends = await attendModel.find();
    res.json(attends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addAttendController = async (req, res) => {
  try {
    const { staffid, name, date, time } = req.body;
    const newAttend = new attendModel({
      staffid,
      name,
      date: new Date(date), // Convert to Date object
      time: new Date(time), // Convert to Date object
    });
    await newAttend.save();
    res.status(201).json({ message: "Attendance added successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad request" });
  }
};

const deleteAttendController = async (req, res) => {
  try {
    const { attendId } = req.params; // Use req.params to get the attendId from the URL
    await attendModel.findOneAndDelete({ _id: attendId }); // Use attendModel
    res.status(200).send("Attendance record deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};


module.exports = {
  getAttendController,
  addAttendController,
  deleteAttendController
};
