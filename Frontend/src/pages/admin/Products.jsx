import { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/fetch-product");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(products);


  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-[20%]">
          <AdminMenu />
        </div>
        <div className="w-[80%]">
          <h1 className="text-center">All Products</h1>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-2 p-4">
            {products?.map((p) => (
              <Link to={`/dashboard/admin/${p.slug}`}
                key={p._id} >
                <div className="card bg-base-100 w-96 shadow-xl">
                  <figure>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full"
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
