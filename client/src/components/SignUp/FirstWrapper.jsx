import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function FirstWrapper({ settoggleSignUp, setemail, email, setotpid }) {
  // const [email, setemail] = useState("");

  const handleSendOTP = async () => {
    if (email == "") {
      toast.warning("Enter Email Correctly!");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      toast.warning("Put Email like the Example given:");
      return;
    }
    try {
      const { data } = await axios.post(
        `http://localhost:5100/user/register/send-otp`,
        { email }
      );
      setotpid(data.otpid);
      settoggleSignUp([false, true, false]);
    } catch (error) {
      toast.warning(error.response?.data?.msg || error.message);
      console.log(error);
    }
  };

  return (
    <div className="bg-teal-900 py-[1rem] w-[500px]  flex flex-col  justify-center rounded-lg ">
      <h1 className="text-white text-[30px] px-4 mx-2">Sign Up</h1>
      <div className="flex flex-col justify-center p-6">
        <p className="text-white p-4 mx-4">Email Address</p>
        <input
          type="email"
          placeholder="Example@gmail.com"
          className="p-6 mx-4 rounded-full w-[400px]  text-black h-[10px] outline-none"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <button
          onClick={handleSendOTP}
          className="border border-white rounded-full p-[12px] mt-5 w-[400px] mx-4 text-white "
        >
          Sign Up
        </button>
      </div>
      {/* <div className="text-white flex justify-evenly w-[100%] items-center h-[50px]">
      <div className="flex gap-3">
        <input type="checkbox" />
        <p>Remember Me</p>
      </div>
    </div> */}
    </div>
  );
}

export default FirstWrapper;
