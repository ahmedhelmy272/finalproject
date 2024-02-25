import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getCart, removeItem, setCounter, updateQty } = useContext(cartContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setloading] = useState(true);

  async function deleteProduct(id) {
    let data = await removeItem(id);
    console.log(data);
    setCartItems(data);
    setCounter(data.numOfCartItems);
    toast.error("Product deleted successfully ");
  }

  async function updataProductQuantity(id, count) {
    let data = await updateQty(id, count);
    console.log(data);
    setCartItems(data);
    setCounter(data.numOfCartItems);
    toast.success("Product Updated successfully ");
  }

  useEffect(() => {
    (async () => {
      let data = await getCart();
      console.log(data);
      if (data.status === "success") {
        setCartItems(data);
        setloading(false);
      }
    })();
  }, []);
  if (cartItems.numOfCartItems == 0)
    return <h2 className="text-main m-5 text-center ">Your Cart is Empty!</h2>;
  if (loading) return <Loading />;
  return (
    <>
      <div className="container my-2 bg-main-light my-5 p-3 rounded-1">
        <h2>Shop Cart</h2>
        <p className="text-main fw-bold  mt-3">
          Total Cart Price:{" "}
          <span className="bg-main text-white p-2 rounded-2 whiteSpace">
            {cartItems?.data?.totalCartPrice} EGP
          </span>
        </p>
        {cartItems.data &&
          cartItems.data.products.map((item) => {
            return (
              <div key={item._id} className="row border-bottom py-2">
                <div className="col-md-1">
                  <img src={item.product.imageCover} className="w-100" alt="" />
                </div>
                <div className="col-md-11 d-flex justify-content-between">
                  <div>
                    <h5>{item.product.title}</h5>
                    <p className="text-main m-0">Price: {item.price} EGP</p>
                    <button
                      onClick={() => deleteProduct(item.product._id)}
                      className="btn"
                    >
                      <i className="fa-solid fa-trash-can text-main"></i> Remove
                    </button>
                  </div>
                  <div>
                    <button
                      disabled={item.count >= item.product.quantity}
                      onClick={() =>
                        updataProductQuantity(item.product._id, item.count + 1)
                      }
                      className="btn brdr"
                    >
                      +
                    </button>
                    <span className="mx-2">{item.count}</span>
                    <button
                      disabled={item.count <= 1}
                      onClick={() =>
                        updataProductQuantity(item.product._id, item.count - 1)
                      }
                      className="btn brdr"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        <Link to={`/address/${cartItems.data._id}`} className="btn bg-main text-white my-3">
          Place Order
        </Link>
      </div>
    </>
  );
}
