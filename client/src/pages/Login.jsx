import React, { useState } from "react";
import FirstWrapper from "../components/SignUp/FirstWrapper";
import SecondWrapper from "@/components/SignUp/SecondWrapper";
// import ThirdWrapper from "@/components/SignUp/ThirdWrapper";

function Login() {
  const [toggle, settoggle] = useState(false);
  const [toggleSignUp, settoggleSignUp] = useState([true, false]);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [otpid, setotpid] = useState("");

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center bg-[rgba(14,14,14,0.9)] text-white \">
      <h1 className="text-[80px] font-bold">AppName</h1>
      <p className="mb-[25px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
        explicabo!
      </p>
      <div className="flex">
        {toggle ? (
          <div>
            {toggleSignUp[0] && (
              <FirstWrapper
                settoggleSignUp={settoggleSignUp}
                setemail={setemail}
                email={email}
                setPassword={setPassword}
                setusername={setusername}
                password={password}
                username={username}
                setotpid={setotpid}
              />
            )}
            {toggleSignUp[1] && (
              <SecondWrapper
                settoggleSignUp={settoggleSignUp}
                setemail={setemail}
                email={email}
                otpid={otpid}
                setPassword={setPassword}
                setusername={setusername}
                password={password}
                username={username}
              />
            )}
            {/* {toggleSignUp[2] && (
              <ThirdWrapper settoggleSignUp={settoggleSignUp} email={email}  />
            )} */}
          </div>
        ) : (
          <div className="flex">
            <div className="bg-teal-900 h-[70vh] w-[500px] flex flex-col  justify-center rounded-lg ">
              <h1 className="text-white text-[30px] px-4 mx-2">Sign In</h1>
              <div className="flex flex-col justify-center p-6">
                <p className="text-white p-4 mx-4">Username</p>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="p-6 mx-4 rounded-full w-[400px]  text-black h-[50px] outline-none"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <p className="text-white p-4 mx-4">Password</p>
                <input
                  type="text"
                  placeholder="Enter Password"
                  className="p-6 mx-4 rounded-full w-[400px]  text-black h-[50px] outline-none"
                />
                <button className="border border-white rounded-full p-[12px] mt-5 w-[400px] p-4 mx-4 text-white">
                  Sign In
                </button>
              </div>
              <div className="text-white flex justify-evenly w-[100%] items-center h-[50px]">
                <div className="flex gap-3">
                  <input type="checkbox" />
                  <p>Remember Me</p>
                </div>
                <p className="underline decoration-solid">Forgot Password</p>
              </div>
            </div>
            <div className=" h-[70vh] w-[500px] rounded-lg bg-white text-teal-900 flex flex-col items-center justify-center">
              <h1 className="text-[40px] font-bold">Welcome to Login</h1>
              <p className="text-lg">Don't have an account?</p>
              <button
                className="border bg-teal-800 text-white  rounded-full p-[12px] mt-5 w-[100px]"
                onClick={() => {
                  settoggle((prev) => !prev);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
