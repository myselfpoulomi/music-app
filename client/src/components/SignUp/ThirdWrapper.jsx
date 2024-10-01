import React from "react";

function ThirdWrapper({ settoggleSignUp }) {
  return (
    <div className="bg-teal-900 py-[1rem] w-[500px] px-[2rem]  flex flex-col  justify-center rounded-lg">
      <p className="text-white p-4 mx-4">Username</p>
      <input
        type="text"
        placeholder="Enter Username"
        className="p-6 mx-4 rounded-full w-[400px]  text-black h-[50px] outline-none"
      />
      <p className="text-white p-4 mx-4">Password</p>
      <input
        type="text"
        placeholder="Enter Password"
        className="p-6 mx-4 rounded-full w-[400px]  text-black h-[50px] outline-none"
      />
      <p className="text-white p-4 mx-4">Conform Password</p>
      <input
        type="text"
        placeholder="Enter Password Again"
        className="p-6 mx-4 rounded-full w-[400px]  text-black h-[50px] outline-none"
      />

      <div className="flex gap-3 flex-col">
        <button className="border border-white rounded-full p-[12px] mt-5 w-[400px] mx-4 text-white ">
          Sign Up
        </button>
        <div className="flex gap-3 justify-center">
          <input type="checkbox" />
          <p>Remember Me</p>
        </div>
      </div>
    </div>
  );
}

export default ThirdWrapper;
