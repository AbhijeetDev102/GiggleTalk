import {React} from 'react'
import "boxicons";
import { useFormik } from "formik";
import { SignupSchema } from "../Schema/Schema";
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { apiUrl } from '../../services/apiJson';



// signup component
const Signup = ({ setComponent, passShow, setpassShow }) => {
    const navigate = useNavigate();


    const submitHandler= async (Userdata)=>{
        try {
          const res = await axios.post(`${apiUrl}/api/v1/signup`, Userdata, {withCredentials:true})
         

          navigate("/profile")
          localStorage.setItem("token", res.data.data.token)



        } catch (error) {
          console.log(error);
          
        }
        
    }

    const { errors, touched, values, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues: {
          Firstname: "",
          Lastname: "",
          Email: "",
          PhoneNumber:"",
          Password: "",
          ConfirmPassword: "",
        },
        validationSchema: SignupSchema,
        onSubmit: (values, { resetForm }) => {
          submitHandler(values)
          resetForm();
        },
      });
  
    return (
      <div className="flex-col items-center justify-center mt-32 ">
        <form
          action=""
          className="flex flex-col items-center "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row lg:justify-center w-full ">
            <div className="p-2">
              <input
                name="Firstname"
                type="text"
                placeholder="Firstname"
                value={values.Firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                className="   text-slate-100 rounded-md bg-slate-800 w-[95%] p-2 outline-none"
              />
              {errors.Firstname && touched.Firstname ? (
                <p className="text-red-500">{errors.Firstname}</p>
              ) : null}
            </div>
  
            <div className="p-2 ">
              <input
                name="Lastname"
                type="text"
                placeholder="Lastname"
                value={values.Lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                className="  text-slate-100 rounded-md w-[95%] bg-slate-800 p-2 outline-none "
              />
  
              {errors.Lastname && touched.Lastname ? (
                <p className="text-red-500">{errors.Lastname}</p>
              ) : null}
            </div>
          </div>
  
          <div className="w-full p-2"> 
            <input
              name="Email"
              type="email"
              placeholder="Email"
              value={values.Email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="  rounded-md  text-slate-100 bg-slate-800 p-2 outline-none w-[95%]"
            />
  
            {errors.Email && touched.Email ? (
              <p className="text-red-500">{errors.Email}</p>
            ) : null}
          </div>
          <div className="w-full p-2"> 
            <input
              name="PhoneNumber"
              type="text"
              placeholder="Phone Number"
              value={values.PhoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className="  rounded-md  text-slate-100 p-2 bg-slate-800 outline-none w-[95%]"
            />
  
            {errors.PhoneNumber && touched.PhoneNumber ? (
              <p className="text-red-500">{errors.PhoneNumber}</p>
            ) : null}
          </div>
  
          <div className="w-full p-2">
            <div className="flex items-center justify-between bg-slate-800   rounded-md  p-2  w-[95%]">
              <input
                name="Password"
                type={passShow ? "text" : "password"}
                placeholder="Password"
                value={values.Password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="outline-none bg-slate-800  text-slate-100 mr-4 w-[90%]"
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
              <p className="text-red-500">{errors.Password}</p>
            ) : null}
          </div>
  
  
          <div className="w-full p-2">
  
            <div className="flex items-center justify-between text-slate-100 bg-slate-800    rounded-md  p-2  w-[95%]">
              <input
            
                name="ConfirmPassword"
                type={passShow ? "text" : "password"}
                placeholder="Confirm password"
                value={values.ConfirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="outline-none  text-slate-100 bg-slate-800 mr-4 w-[90%]"
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
  
            {errors.ConfirmPassword && touched.ConfirmPassword?
                (<p className="text-red-500">{errors.ConfirmPassword}</p>) : null
          }
          </div>
          <button type="submit" className="bg-green-400 rounded-md m-2 p-3 w-4/5">
            Signup
          </button>
        </form>
  
        <div className="flex justify-center mt-2 text-sm">
          <p className=" pr-2"> Already have an account ? </p>
          <button
            onClick={() => {
              setComponent("Login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  };

export default Signup