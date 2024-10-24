import React, { useEffect, useState } from "react";
import axios from "axios";
import InputOTPPattern from "./InputOTPPattern";
import { toast } from "react-toastify";

// otpid, otp (sended on email), email

function SecondWrapper({ setemail, email, otpid , username, password}) {
  const [otp, setotp] = useState("");
  async function handleVerifyOTP() {
    try {
      const { data } = await axios.post(
        `http://localhost:5100/user/register/verify-otp`,
        { email, username, password, otpid, otp }
      );
      
      console.log(data);
    } catch (error) {
      toast.warning(error.response?.data?.msg || error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(otp);
  }, [otp]);

  return (
    <div className="bg-teal-900 py-[1rem] w-[500px]  flex flex-col  justify-center rounded-lg ">
      <h1 className="text-white text-[30px] px-4 mx-2">OTP has been sent</h1>
      <div className="flex flex-col justify-center p-6">
        <p className="text-white p-4 mx-4">
          We've sent an 5-digit otp to your email address.Enter OTP to
          proceed...
        </p>
        <div className="flex justify-center flex-col items-center ">
          <InputOTPPattern setotp={setotp} otp={otp} />
          <button
            onClick={handleVerifyOTP}
            className="border border-white rounded-full p-[12px] mt-5 w-[350px] mx-4 text-white"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default SecondWrapper;
