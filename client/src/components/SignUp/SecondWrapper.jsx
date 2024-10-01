import React from 'react'

function SecondWrapper () {
    return (
        <div className="bg-teal-900 py-[1rem] w-[500px]  flex flex-col  justify-center rounded-lg ">
    <h1 className="text-white text-[30px] px-4 mx-2">OTP has been sent</h1>
    <div className="flex flex-col justify-center p-6">
      <p className="text-white p-4 mx-4">We've sent an 5-digit otp to your email address.Enter OTP to proceed...</p>
      <input
        type="text"
        placeholder="Example@gmail.com"
        className="p-6 mx-4 rounded-full w-[400px]  text-black h-[10px] outline-none"
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <button className="border border-white rounded-full p-[12px] mt-5 w-[400px] mx-4 text-white">
        Sign Up
      </button>
    </div>
    <div className="text-white flex justify-evenly w-[100%] items-center h-[50px]">
      <div className="flex gap-3">
        <input type="checkbox" />
        <p>Remember Me</p>
      </div>
    </div>
  </div>
    )
}

export default SecondWrapper;