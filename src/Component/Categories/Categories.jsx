import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Categories({ item }) {
  const [Categories, setCategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories/"
    );
    setCategories(data.data);
    console.log(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="container my-5 ">
        <div className="row d-flex justify-content-between ">
          {Categories.map((item) => {
            return (
              <div key={item.id} className="col-md-4 brdr rounded-3 p-0  d-flex flex-column justify-content-between ">
                <img
                  className="w-100 h-100 rounded-3"
                  src={item.image}
                  alt=""
                />
                <h2 className="p-3">{item.name}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

