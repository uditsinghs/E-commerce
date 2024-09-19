/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Checkbox } from 'antd'
function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/fetch-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/fetch-category"
      );
      setCategories(response.data.Categories);
    } catch (error) {
      console.error(error);
      toast.error("Error while fetching categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex">
        <div className="w-[20%]">
          <h4 className="text-2xl font-bold">Filter By Category</h4>
          <div>
            {categories.map((c) => (
              <Checkbox key={c._id} onChange={(e) => console.log(e)
              }>
            {c.name}
          </Checkbox>
            ))}

        </div>
      </div>
      <div className="w-[80%]">
        <h1 className="text-center font-bold mt-5 text-xl">All products</h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 p-4">

          {products?.map((p) => (
            <div key={p._id} className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {p.name}
                </h2>
                <p>{p.description}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">${p.price}</div>
                  <div className="badge badge-outline">{p.quantity}</div>
                </div>
              </div>
              <div className="flex justify-evenly gap-4 p-2">
                <button className="py-2 px-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 duration-300 ">More Details </button>
                <button className="py-2 px-2 text-white bg-gray-500 rounded-lg hover:bg-gray-700 duration-300 ">Add to Cart </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div >
  );
}

export default Home;
