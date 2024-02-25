import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import Categories from "../Categories/Categories";
import Products from "../Products/Products";

export default function Home() {
  return (
    <div>
      <MainSlider />
      <Products/>
    </div>
  );
}
