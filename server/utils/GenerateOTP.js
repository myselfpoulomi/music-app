function GenerateOTP(n) {
  const digits = "0123456789";
  let OTP = "";
  OTP += digits[Math.floor(Math.random() * 9) + 1];
  for (let i = 1; i < n; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
