import React, { useState } from "react";
import "boxicons";
import Login from "../components/Login";
import Signup from "../components/Signup";




const Auth = () => {

  const [component, setComponent] = useState("Login");
  const [passShow, setpassShow] = useState(false);

  return (
    <>
      <div className="h-[100vh] w-[100%] flex  items-center justify-center bg-slate-900 ">
        <div className=" min-h-[80%] lg:w-[60%] bg-slate-950 p-12 rounded-3xl flex flex-col justify-center items-center transition duration-500 ease-in-out  relative text-slate-100 font-semibold">
          <div className="absolute top-4 lg:top-6 ">
            <div className="flex justify-between items-center my-4 ">
              <h1 className="text-4xl font-bold  mx-4">
                Welcome
              </h1>
              <box-icon
                name="message-square-dots"
                size="lg"
                type="solid"
                color="#80f384"
              />
            </div>
            <div className=" relative  flex">
              <div
                className={`rounded-lg py-4 px-9 m-1 h-[85%] w-[42%] bg-green-400 absolute -z-5 transition-transform duration-500 ease-in-out ${
                  component == "Login" ? "translate-x-0" : "translate-x-full"
                }  `}
              ></div>

              <button
                className="rounded-lg py-4 px-8 z-20"
                onClick={() => {
                  setComponent("Login");
                }}
              >
                Login
              </button>
              <button
                className="rounded-lg py-4 px-8 z-20"
                onClick={() => {
                  setComponent("Signup");
                }}
              >
                Signup
              </button>
            </div>
          </div>

          {component == "Login" && (
            <Login
              setComponent={setComponent}
              passShow={passShow}
              setpassShow={setpassShow}
            />
          )}
          {component == "Signup" && (
            <Signup
              setComponent={setComponent}
              passShow={passShow}
              setpassShow={setpassShow}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
