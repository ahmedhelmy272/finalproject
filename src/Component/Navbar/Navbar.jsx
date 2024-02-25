import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { counter, getCart, setCounter } = useContext(cartContext);
  useEffect(() => {
    (async () => {
      let data = await getCart();
      if (data.status == "success") {
        setCounter(data.numOfCartItems);
      }
    })();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
      <div className="container-fluid mx-3">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link text-main active" : "nav-link"
                }
                aria-current="page"
                to="home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link text-main" : "nav-link"
                }
                to="product"
              >
                Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link text-main" : "nav-link"
                }
                to="categories"
              >
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link text-main" : "nav-link"
                }
                to="brands"
              >
                Brands
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-main position-relative"
                    : "nav-link position-relative"
                }
                to="cart"
              >
                Cart
                <i className="fa-solid fa-cart-shopping cartIcon mx-2 icon-width"></i>
                {counter ? (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {counter}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                ) : (
                  ""
                )}
              </NavLink>
            </li>
            <li className="nav-item d-flex align-items-center">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-main position-relative"
                    : "nav-link position-relative"
                }
                to="wishlist"
              >
                WishList
                <i className="fa-solid fa-heart cartIcon mx-2 icon-width"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  4<span className="visually-hidden">unread messages</span>
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link text-main" : "nav-link"
                }
                to="logout"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
