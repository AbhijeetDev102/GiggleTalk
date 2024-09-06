import React, { useState } from "react";
import "boxicons";

const Login = () => {
  return (
    <div className="flex items-center justify-center  ">
      <form action="" className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-green-300 rounded-xl m-2 p-2 outline-none w-[95%]"
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-green-300 rounded-xl m-2 p-2 outline-none w-[95%]"
        />

        <button type="submit" className="bg-green-400 rounded-xl m-2 p-3 w-4/5">
          Login
        </button>
      </form>
    </div>
  );
};
const Signup = () => {
  return (
    <div className="flex items-center justify-center mt-32 ">
      <form action="" className="flex flex-col items-center">
        <div className="flex flex-col lg:flex-row lg:justify-center ">
          <input
            type="text"
            placeholder="Firstname"
            className="border-2 border-green-300 rounded-xl m-2 p-2 outline-none"
          />
          <input
            type="text"
            placeholder="Lastname"
            className="border-2 border-green-300 rounded-xl m-2 p-2 outline-none"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-green-300 rounded-xl m-2 p-2 outline-none w-[95%]"
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-green-300 rounded-xl m-2 p-2 outline-none w-[95%]"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border-2 border-green-300 rounded-xl m-2 p-2 outline-none w-[95%]"
        />
        <button type="submit" className="bg-green-400 rounded-xl m-2 p-3 w-4/5">
          Signup
        </button>
      </form>
    </div>
  );
};

const Auth = () => {
  const [component, setComponent] = useState("Login");
  return (
    <>
      <div className="h-[100vh] w-[100%] flex  items-center justify-center ">


        <div className=" h-[80%] lg:w-[60%] border shadow-md shadow-slate-300 p-12 rounded-3xl flex flex-col justify-center items-center transition duration-500 ease-in-out  relative">

          <div className="absolute top-4 lg:top-6 ">
          <div className="flex justify-between items-center my-4 ">
            <h1 className="text-4xl font-bold text-slate-600 mx-4">Welcome</h1>
            <box-icon
              name="message-square-dots"
              size="lg"
              type="solid"
              color="#80f384"
            />
          </div>
          <div className=" relative  flex">
            <div
              className={`rounded-lg py-4 px-9 m-1 h-[85%] w-[42%] bg-green-300 absolute -z-10 transition-transform duration-500 ease-in-out ${
                component == "Login" ? "translate-x-0" : "translate-x-full"
              }  `}
            ></div>

            <button
              className="rounded-lg py-4 px-8 "
              onClick={() => {
                setComponent("Login");
              }}
            >
              Login
            </button>
            <button
              className="rounded-lg py-4 px-8"
              onClick={() => {
                setComponent("Signup");
              }}
            >
              Signup
            </button>
          </div>
          </div>
          
          {component == "Login" && <Login />}
          {component == "Signup" && <Signup />}
        </div>
      </div>
    </>
  );
};

export default Auth;
