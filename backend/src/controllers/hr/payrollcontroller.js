// Placeholder — HR payroll controller (to be implemented)
export const runPayroll = async (req, res, next) => {
  try {
    res.json({ success: true, message: "Payroll endpoint — coming soon" });
  } catch (err) {
    next(err);
  }
};