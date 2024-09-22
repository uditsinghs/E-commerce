/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";


function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const getAllProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/productlist-count/${page}`);
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  // get total
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count")
      setTotal(data?.total)
    } catch (error) {
      console.log(error);

    }
  }
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
    getTotal()
  }, []);
  console.log(total);

  // Load More
  useEffect(() => {
    if (page == 1) return
    loadMore()
  }, [page])
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/productlist-count/${page}`);
      setProducts([...products, ...data.products])
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)

    }

  }
  const handleFilter = (id, value) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!radio.length && !checked.length) getAllProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (radio.length || checked.length) Filterproducts();
  }, [checked, radio]);

  const Filterproducts = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/product/filter-product", {
        checked,
        radio
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-full h-full">
      <div className="flex">
        <div className="flex flex-col">
          <div className="w-[20%]">
            <h4 className="text-2xl font-bold m-3">Filter By Category</h4>

            <div className="flex flex-col gap-3 mt-2 ml-3">
              {categories?.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(c._id, e.target.checked)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          {/* filter by Prices */}
          <div className="">
            <h4 className="text-2xl font-bold m-4">Filter By Price</h4>
            <div className="">
              <Radio.Group onChange={(e) => setRadio(e.target.value)} className="flex flex-col gap-2 mt-2 ml-3">
                {Prices?.map((p) => (
                  <Radio key={p._id} value={p.array}>
                    {p.name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
          <button className="py-2 px-3 bg-red-500 rounded-lg pt-2 hover:bg-red-700 duration-300 text-white" onClick={() => window.location.reload()}>Reset Filter</button>
        </div>
        <div className="w-[80%]">
          <h1 className="text-center font-bold mt-5 text-xl">All Products</h1>
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
                  <Link
                    to={`/product/${p.slug}`}
                    className="py-2 px-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 duration-300 ">More Details</Link>
                  <button className="py-2 px-2 text-white bg-gray-500 rounded-lg hover:bg-gray-700 duration-300 ">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="py-2 m-3 flex justify-center ">
            {products && products.length < total && (
              <button className="py-2 px-2 bg-red-500 text-white rounded-lg"
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }
                }>
                {loading ? <LoadingSpinner /> : "LoadMore"}
              </button>
            )}
          </div>
        </div>

      </div>
    </div >
  );
}

export default Home;
