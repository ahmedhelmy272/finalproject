import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  let { counter, setCounter ,addToCart} = useContext(cartContext);
  let [btnLoading, setBtnLoading] = useState(true);
  let x = useParams();
  let [product, setProduct] = useState({});
  let [loading, setLoading] = useState(true);

  async function addProductToCart(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);
    console.log(data);
    if (data.status == "success") {
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
      toast.success("Product added successfully to your cart");
    }
  }

  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${x.id}`
    );
    setProduct(data.data);
    setLoading(false);  
  }

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3">
            <img src={product.imageCover} className="w-100" alt="" />
          </div>
          <div className="col-md-9">
            <h4 className="fw-bold ">{product.title}</h4>
            <p className="my-3">{product.description}</p>
            <div>
              <div>
                <span>{product.category.name}</span>
                <div className="d-flex justify-content-between my-4">
                  <div className="bg-main text-white p-2 rounded-2 fw-bold whiteSpace">
                    {product.price}EGP
                  </div>
                  <div>
                    <i className="fa-solid fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => addProductToCart(product._id)}
              disabled={!btnLoading}
              className="btn bg-main text-white w-100"
            >
              {btnLoading ? "Add To Cart" : "loading..."}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
