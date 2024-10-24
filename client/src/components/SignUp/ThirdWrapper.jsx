import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ThirdWrapper({ settoggleSignUp, email }) {
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");

  // function handleName(e) {
  //   console.log(e.target.value);
  //   setName(e.target.value);
  // }

  // function handlePassword(e) {
  //   setPassword(e.target.value);
  // }

  async function handleRegister() {
    try {
      const { data } = await axios.post(
        `http://localhost:5100/user/register/create-user`,
        { email, password, name }
      );
      console.log(data);
    } catch (error) {
      
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(email, name, password);
  }, [email, name, password]);

  return (
    <div className="bg-teal-900 py-[1rem] w-[500px] px-[2rem]  flex flex-col  justify-center rounded-lg">
      {/* <p className="text-white p-4 mx-4">Username</p>
      <input
        type="text"
        placeholder="Enter Username"
        className="p-6 mx-4 rounded-full w-[400px]  text-black h-[50px] outline-none"
        onChange={handleName}
      /> */}
      {/* <p className="text-white p-4 mx-4">Password</p>
      <input
        type="text"
        placeholder="Enter Password"
        className="p-6 mx-4 rounded-full w-[400px]  text-black h-[50px] outline-none"
        onChange={handlePassword}
      /> */}
      <div className="flex gap-3 flex-col">
        <button
          className="border border-white rounded-full p-[12px] mt-5 w-[400px] mx-4 text-white "
          onClick={handleRegister}
        >
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
