import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function FirstWrapper({
  setemail,
  email,
  username,
  setusername,
  setPassword,
  password
}) {
  return (
    <div className="bg-teal-900 py-[1rem] w-[500px]  flex flex-col  justify-center rounded-lg ">
      <h1 className="text-white text-[30px] px-4 mx-2">Sign Up</h1>
      <div className="flex flex-col justify-center p-6">
        <p className="text-white p-4 mx-4">Username</p>
        <input
          type="text"
          placeholder="Enter Username"
          className="p-6 mx-4 rounded-full w-[400px]  text-black h-[50px] outline-none"
        />
        <p className="text-white p-4 mx-4">Email Address</p>
        <input
          type="email"
          placeholder="Example@gmail.com"
          className="p-6 mx-4 rounded-full w-[400px]  text-black h-[10px] outline-none"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <p className="text-white p-4 mx-4">Password</p>
        <input
          type="text"
          placeholder="Enter Password"
          className="p-6 mx-4 rounded-full w-[400px]  text-black h-[50px] outline-none"
        />
        <button className="border border-white rounded-full p-[12px] mt-5 w-[400px] mx-4 text-white ">
          Sign Up
        </button>
      </div>
      <div className="flex gap-3 justify-center">
        <input type="checkbox" />
        <p>Remember Me</p>
      </div>
    </div>
  );
}

export default FirstWrapper;
