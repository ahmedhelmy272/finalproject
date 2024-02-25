import React from "react";
import notfound from "../../assets/images/error.svg";

export default function Notfound() {
  return (
    <div className="text-center mt-5">
      <img src={notfound} alt="" />
    </div>
  );
}
