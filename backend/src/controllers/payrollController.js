import Payroll from "../mocks/payrollMock.js";
import payrollEmitter from "../events/payrollemitter.js";

export const createPayroll = async (req, res, next) => {
  try {
    const payroll = await Payroll.create(req.body);
    payrollEmitter.emit("payrollProcessed", payroll);
    res.status(201).json({ success: true, data: payroll });
  } catch (err) { next(err); }
};

export const getPayroll = async (req, res, next) => {
  try { const data = await Payroll.find(); res.status(200).json({ success: true, data }); }
  catch (err) { next(err); }
};