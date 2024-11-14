/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../context/Cart";

function Home() {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/productlist-count/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch categories
  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/category/fetch-category");
      setCategories(response.data.Categories);
    } catch (error) {
      console.error(error);
      toast.error("Error while fetching categories");
    }
  };

  useEffect(() => {
    getCategories();
    getTotal();
  }, []);

  // Load more products when page changes
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/productlist-count/${page}`);
      setProducts([...products, ...data.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (id, value) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!radio.length && !checked.length) getAllProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (radio.length || checked.length) FilterProducts();
  }, [checked, radio]);

  const FilterProducts = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/product/filter-product", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full p-4">
      <div className="flex flex-col md:flex-row">
        {/* Filter Section */}
        <div className="w-full md:w-1/4 p-2">
          <div className="border-b pb-4">
            <h4 className="text-xl font-bold mb-3">Filter By Category</h4>
            <div className="flex flex-col space-y-2">
              {categories?.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(c._id, e.target.checked)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>

          {/* Filter by Price */}
          <div className="border-b py-4">
            <h4 className="text-xl font-bold mb-3">Filter By Price</h4>
            <Radio.Group onChange={(e) => setRadio(e.target.value)} className="flex flex-col space-y-2">
              {Prices?.map((p) => (
                <Radio key={p._id} value={p.array}>
                  {p.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>

          <button className="mt-4 w-full py-2 bg-red-500 rounded-lg text-white hover:bg-red-700" onClick={() => window.location.reload()}>
            Reset Filter
          </button>
        </div>

        {/* Product Section */}
        <div className="w-full md:w-3/4 p-4">
          {loading ? <LoadingSpinner /> : ""}
          <h1 className="text-center font-bold text-xl mb-5">All Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((p) => (
              <div key={p._id} className="card bg-white shadow-md rounded-lg overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{p.name}</h2>
                  <p className="text-gray-600 mt-2">{p.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-800 font-bold">${p.price}</span>
                    <span className="text-gray-500">{p.quantity}</span>
                  </div>
                </div>
                <div className="flex justify-between p-4">
                  <Link to={`/product/${p.slug}`} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                    More Details
                  </Link>
                  <button
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("Product", JSON.stringify([...cart, p]));
                      toast.success("Item added to Cart");
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-6 flex justify-center">
            {products && products.length < total && (
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
