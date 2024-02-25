import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  let validationSchema = Yup.object({
    email: Yup.string().required("Email Required").email("Enter Valid Email"),
    password: Yup.string()
      .required("password Is Required")
      .matches(/^[A-Z][a-zA-Z!@#$%^&*()-_0-9]{6,16}$/, "Enter Valid Password"),
  });

  function sendDataToApi(values) {
    setLoading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        if (data.message === "success") {
          navigate("/home");
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setLoading(true);
      });
  }
  let login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <div className="mt-5 container">
      <h1>login Now....</h1>
      <form onSubmit={login.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          onBlur={login.handleBlur}
          onChange={login.handleChange}
          className="form-control mb-3"
          type="email"
          name="email"
          id="email"
        />
        {login.errors.email && login.touched.email ? (
          <div className="alert alert-danger">{login.errors.email}</div>
        ) : (
          ""
        )}
        <label htmlFor="name">password:</label>
        <input
          onBlur={login.handleBlur}
          onChange={login.handleChange}
          className="form-control mb-3"
          type="password"
          name="password"
          id="password"
        />
        {login.errors.password && login.touched.password ? (
          <div className="alert alert-danger">{login.errors.password}</div>
        ) : (
          ""
        )}
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : (
          ""
        )}
        <button
          disabled={!(login.isValid && login.dirty)}
          type="submit"
          onClick={login.handleSubmit}
          className="btn bg-main text-white"
        >
          {loading ? "login" : <i className="fa  fa-spinner fa-spin"></i>}
        </button>
      </form>
    </div>
  );
}
