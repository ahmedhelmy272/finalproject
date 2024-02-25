import React from "react";
import { Outlet } from "react-router-dom";
import AuthNavbar from "../Component/AuthNavbar/AuthNavbar";

export default function AuthLayout() {
  return (
    <div>
      <AuthNavbar />
      <Outlet />
    </div>
  );
}
