export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOTPHTML(otp) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification — Amdox ERP</title>
  <style>
    body {
      margin: 0; padding: 0;
      background: #f4f6fb;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .wrapper {
      max-width: 480px; margin: 40px auto; padding: 40px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      text-align: center;
    }
    .brand { font-size: 28px; font-weight: 700; color: #1e3a8a; letter-spacing: 2px; margin-bottom: 8px; }
    h2 { color: #111827; font-size: 20px; margin-bottom: 8px; }
    p  { color: #4b5563; font-size: 14px; line-height: 1.6; }
    .otp-code {
      display: inline-block; margin: 24px 0;
      padding: 16px 40px; font-size: 32px; font-weight: 700;
      letter-spacing: 8px; color: #1e3a8a;
      background: linear-gradient(135deg, #eff6ff, #e0eaff);
      border-radius: 12px;
    }
    .footer { margin-top: 24px; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="brand">AMDOX ERP</div>
    <h2>Email Verification</h2>
    <p>Use the code below to verify your email address.</p>
    <div class="otp-code">${otp}</div>
    <p>This code expires in <strong>10 minutes</strong>.</p>
    <div class="footer">If you didn't request this, please ignore this email.</div>
  </div>
</body>
</html>`;
}
