import Attendance from "../mocks/attendanceMock.js";

export const createAttendance = async (req, res, next) => {
  try { const data = await Attendance.create(req.body); res.status(201).json({ success: true, data }); }
  catch (err) { next(err); }
};

export const getAttendance = async (req, res, next) => {
  try { const data = await Attendance.find(); res.status(200).json({ success: true, data }); }
  catch (err) { next(err); }
};