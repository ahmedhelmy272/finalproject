import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";

export default function Adrress() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  let { pay } = useContext(cartContext);

  let { id } = useParams();

  async function sendDataToApi(values) {
    setLoading(false);
    let data = await pay(id, values);
    console.log(data);
    if (data.status == "success") {
      window.location.href = data.session.url
    }
  }
  let address = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <div className="mt-5 container">
      <h1>address Now....</h1>
      <form onSubmit={address.handleSubmit}>
        <label htmlFor="Details">details:</label>
        <textarea
          onBlur={address.handleBlur}
          onChange={address.handleChange}
          className="form-control mb-3"
          type="text"
          name="details"
          id="details"
        ></textarea>
        <label htmlFor="phone">Phone:</label>
        <input
          onBlur={address.handleBlur}
          onChange={address.handleChange}
          className="form-control mb-3"
          type="text"
          name="phone "
          id="phone"
        />
        <label htmlFor="city">City:</label>
        <input
          onBlur={address.handleBlur}
          onChange={address.handleChange}
          className="form-control mb-3"
          type="text"
          name="city "
          id="city"
        />
        <button
          disabled={!(address.isValid && address.dirty)}
          type="submit"
          onClick={address.handleSubmit}
          className="btn bg-main text-white"
        >
          {loading ? "Pay" : <i className="fa  fa-spinner fa-spin"></i>}
        </button>
      </form>
    </div>
  );
}
