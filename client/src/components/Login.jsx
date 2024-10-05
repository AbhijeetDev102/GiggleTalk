import React from "react";
import "boxicons";
import axios from "axios";
import { useFormik } from "formik";
import { LoginSchema } from "../Schema/Schema";
import {useNavigate} from "react-router-dom"


const Login = ({ setComponent, passShow, setpassShow }) => {
  const navigate = useNavigate()
  const submitHandler = async (Userdata) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        Userdata,
        {withCredentials:true}
      );
      console.log(res);

      if(res.data.data.profileSetup){
        navigate("/chat")
      }else{navigate("/profile")}


    } catch (error) {
      console.log(error);
    }
  };

  const { errors, touched, values, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        Email: "",
        Password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: (values, { resetForm }) => {
        submitHandler(values);
        resetForm();
      },
    });
  return (
    <div className="flex-col items-center justify-center  lg:mt-10 ">
      <form
        action=""
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="p-2  w-full">
          <input
            name="Email"
            type="email"
            placeholder="Email"
            value={values.Email}
            onBlur={handleBlur}
            onChange={handleChange}
            className="border border-green-300 rounded-xl  p-2 outline-none w-[95%]"
          />
          {errors.Email && touched.Email ? (
            <p className="text-red-500 font-semibold">{errors.Email}</p>
          ) : null}
        </div>

        <div className="p-2 w-full">
          <div className="flex items-center justify-center border border-green-300 rounded-xl  p-2  w-[95%]">
            <input
              name="Password"
              type={passShow ? "text" : "password"}
              placeholder="Password"
              value={values.Password}
              onBlur={handleBlur}
              onChange={handleChange}
              className="outline-none mr-2 w-[90%]"
            />

            {passShow ? (
              <box-icon
                name="show"
                color="#475569"
                onClick={() => {
                  setpassShow(!passShow);
                }}
              />
            ) : (
              <box-icon
                name="hide"
                color="#475569"
                onClick={() => {
                  setpassShow(!passShow);
                }}
              />
            )}
          </div>

          {errors.Password && touched.Password ? (
            <p className="text-red-500 font-semibold">{errors.Password}</p>
          ) : null}
        </div>
        <button type="submit" className="bg-green-400 rounded-xl m-2 p-3 w-4/5">
          Login
        </button>
      </form>

      <div className="flex justify-center mt-2 text-sm ">
        <p className="pr-2">Doesn't have an account ? </p>
        <button
          onClick={() => {
            setComponent("Signup");
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Login;
