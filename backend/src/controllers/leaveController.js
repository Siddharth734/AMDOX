import Leave from "../mocks/leaveMock.js";

export const createLeave = async (req, res, next) => {
  try { const leave = await Leave.create(req.body); res.status(201).json({ success: true, data: leave }); }
  catch (err) { next(err); }
};

export const getLeaves = async (req, res, next) => {
  try { const data = await Leave.find(); res.status(200).json({ success: true, data }); }
  catch (err) { next(err); }
};