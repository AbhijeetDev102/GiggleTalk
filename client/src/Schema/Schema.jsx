import * as Yup from "yup";

export const SignupSchema = Yup.object({
  Firstname: Yup.string().min(3).required("Please enter first name"),
  Lastname: Yup.string().min(3).required("Please enter last name"),
  Email: Yup.string().min(3).required("Please enter email name"),
  Password: Yup.string().min(3).required("Please enter password name"),
  ConfirmPassword: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("Password")],"Password doesn't match"),
});

export const LoginSchema = Yup.object({
  Email: Yup.string().min(3).required("Please enter email name"),
  Password: Yup.string().min(3).required("Please enter password name"),
})