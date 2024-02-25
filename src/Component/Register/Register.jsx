import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name Is Required")
      .min(3, "Min Char 3")
      .max(20, "Max Char 20"),
    email: Yup.string().required("Email Required").email("Enter Valid Email"),
    password: Yup.string()
      .required("password Is Required")
      .matches(/^[A-Z][a-zA-Z!@#$%^&*()-_0-9]{6,16}$/, "Enter Valid Password"),
    rePassword: Yup.string()
      .required("rePassword Required")
      .oneOf([Yup.ref("password")], "RePassword Not Match"),
    phone: Yup.string()
      .required("Phone Is Required")
      .matches(/^01[0125][0-9]{8}$/, "Enter Valid Phone"),
  });

  function sendDataToApi(values) {
    setLoading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        console.log(data);
        if (data.message === "success") {
          navigate("/login");
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setLoading(true);
      });
  }
  let register = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <div className="mt-5 container">
      <h1>Register Now....</h1>
      <form onSubmit={register.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          onBlur={register.handleBlur}
          onChange={register.handleChange}
          className="form-control mb-3"
          type="text"
          name="name"
          id="name"
        />
        {register.errors.name && register.touched.name ? (
          <div className="alert alert-danger">{register.errors.name}</div>
        ) : (
          ""
        )}
        <label htmlFor="email">Email:</label>
        <input
          onBlur={register.handleBlur}
          onChange={register.handleChange}
          className="form-control mb-3"
          type="email"
          name="email"
          id="email"
        />
        {register.errors.email && register.touched.email ? (
          <div className="alert alert-danger">{register.errors.email}</div>
        ) : (
          ""
        )}
        <label htmlFor="name">Phone:</label>
        <input
          onBlur={register.handleBlur}
          onChange={register.handleChange}
          className="form-control mb-3"
          type="tel"
          name="phone"
          id="phone"
        />
        {register.errors.phone && register.touched.phone ? (
          <div className="alert alert-danger">{register.errors.phone}</div>
        ) : (
          ""
        )}
        <label htmlFor="name">password:</label>
        <input
          onBlur={register.handleBlur}
          onChange={register.handleChange}
          className="form-control mb-3"
          type="password"
          name="password"
          id="password"
        />
        {register.errors.password && register.touched.password ? (
          <div className="alert alert-danger">{register.errors.password}</div>
        ) : (
          ""
        )}
        <label htmlFor="name">rePassword:</label>
        <input
          onBlur={register.handleBlur}
          onChange={register.handleChange}
          className="form-control mb-3"
          type="password"
          name="rePassword"
          id="rePassword"
        />
        {register.errors.rePassword && register.touched.rePassword ? (
          <div className="alert alert-danger">{register.errors.rePassword}</div>
        ) : (
          ""
        )}
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : (
          ""
        )}
        <button
          disabled={!(register.isValid && register.dirty)}
          type="submit"
          onClick={register.handleSubmit}
          className="btn bg-main text-white"
        >
          {loading ? "Register" : <i className="fa  fa-spinner fa-spin"></i>}
        </button>
      </form>
    </div>
  );
}
