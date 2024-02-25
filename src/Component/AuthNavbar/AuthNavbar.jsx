import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";

export default function Navbar() {
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link text-main" : "nav-link"
                }
                aria-current="page"
                to="login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link text-main" : "nav-link"
                }
                to="register"
              >
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
