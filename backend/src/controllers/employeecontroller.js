import Employee from "../mocks/employeeMock.js";

export const createEmployee = async (req, res, next) => {
  try { const emp = await Employee.create(req.body); res.status(201).json({ success: true, data: emp }); }
  catch (err) { next(err); }
};

export const getEmployees = async (req, res, next) => {
  try { const data = await Employee.find(); res.status(200).json({ success: true, data }); }
  catch (err) { next(err); }
};