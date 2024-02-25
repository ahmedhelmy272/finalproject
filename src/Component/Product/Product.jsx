import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function Product({ item }) {
  let { counter, setCounter, addToCart } = useContext(cartContext);
  let [btnLoading, setBtnLoading] = useState(true);

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
  return (
    <>
      <div className="col-md-2 overflow-hidden">
        <div className="product cursor-pointer rounded-3 p-3">
          <Link to={"/product-details/" + item._id}>
            <img src={item.imageCover} className="w-100" alt="" />
            <span className="text-main">{item.category.name}</span>
            <h5 className="my-2 fw-bold">
              {item.title.split(" ").slice(0, 2).join(" ")}
            </h5>
            <div className="d-flex justify-content-between my-3">
              <div>{item.price}EGP</div>
              <div>
                <i className="fa-solid fa-star rating-color"></i>
                {item.ratingsAverage}
              </div>
            </div>
          </Link>
          <button
            onClick={() => addProductToCart(item._id)}
            disabled={!btnLoading}
            className="btn bg-main w-100 text-white"
          >
            {btnLoading ? "Add To Cart" : "loading..."}
          </button>
        </div>
      </div>
    </>
  );
}
