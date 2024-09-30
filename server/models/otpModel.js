import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});
otpSchema.index({ time: 1 }, { expireAfterSeconds: 120 });

const otpModel = mongoose.model("Otp", otpSchema);

export default otpModel;
