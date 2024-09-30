function GenerateOTP(n) {
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  const remainingDigits = Math.floor(Math.random() * Math.pow(10, n - 1));
  return firstDigit * Math.pow(10, n - 1) + remainingDigits;
}
export default GenerateOTP;
