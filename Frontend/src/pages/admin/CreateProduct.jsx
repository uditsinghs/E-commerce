import { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate()
  const [auth] = useAuth()
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);

  // get category
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

  // create Product
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("category", category)
      productData.append("shipping", shipping)
      productData.append("image", image)
      const { data } = await axios.post("http://localhost:8080/api/v1/product/create-product", {
        productData
      },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          }
        })
      if (data.success) {
        toast.success("Product Created Successfully")
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")

    }
  }
  return (
    <div className="w-full h-screen flex p-4">
      <div className="md:w-[20%] w-[30%]">
        <AdminMenu />
      </div>
      <div className="md:w-[80%] w-[70%] p-5">
        <div className="md:w-full  border border-black p-10">
          <h2 className="text-xl font-bold text-center">Create Product</h2>
          <div className="w-full">
            <select
              className=" my-3 bg-slate-100 p-2 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select Category</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="w-full bg-slate-300 text-center p-2 font-bold">
              {image ? image.name : "upload image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className="mb-3 flex justify-center">
            {image && (
              <div className="text-center">
                <img src={URL.createObjectURL(image)} alt="product-image" className="cover h-[200px]" />
              </div>
            )}
          </div>

          <div className="w-full">

            <div className="mb-3">
              <input type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="outline-none p-2 text-xl bg-slate-100 rounded-lg w-full" />
            </div>
            <div className="mb-3">
              <textarea type="text"
                placeholder="Description "
                value={description}
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                className="outline-none p-2 text-xl bg-slate-100 rounded-lg w-full" />
            </div>
            <div className="mb-3">
              <input type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="outline-none p-2 text-xl bg-slate-100 rounded-lg w-full" />
            </div>
            <div className="mb-3">
              <input type="number"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="outline-none p-2 text-xl bg-slate-100 rounded-lg w-full" />
            </div>
            <div className="mb-3 p-2 text-xl bg-slate-100 rounded-lg">
              <select value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                className="outline-none w-full">
                <option>Select shipping</option>
                <option value="0">
                  No
                </option>
                <option value="1">
                  Yes
                </option>
              </select>

            </div>
            <div className="mb-3">
              <button onClick={handleCreate} className="w-full bg-blue-500 py-2 text-white hover:bg-blue-700 duration-300 ">Create Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
