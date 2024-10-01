import React from "react";

import { InputOTPPattern } from "./InputOTPPattern";



function SecondWrapper({settoggleSignUp}) {
    function handleVerifyOTP(){
        settoggleSignUp([false,false,true]);
    }

  return (
    <div className="bg-teal-900 py-[1rem] w-[500px]  flex flex-col  justify-center rounded-lg ">
      <h1 className="text-white text-[30px] px-4 mx-2">OTP has been sent</h1>
      <div className="flex flex-col justify-center p-6">
        <p className="text-white p-4 mx-4">
          We've sent an 5-digit otp to your email address.Enter OTP to
          proceed...
        </p>
        <div className="flex justify-center flex-col items-center ">
        <InputOTPPattern/>
        <button onClick={handleVerifyOTP}
        className="border border-white rounded-full p-[12px] mt-5 w-[350px] mx-4 text-white">
          Verify
        </button>
      </div>
      </div>
    </div>
  );
}

export default SecondWrapper;
