export const generatePayslip = async (payroll) => {
  const fileName = `payslip-${payroll.employeeId}.pdf`;
  return fileName;
};