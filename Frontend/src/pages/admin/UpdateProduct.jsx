/* eslint-disable react/jsx-no-duplicate-props */
import { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../routes/Spinner";

const UpdateProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false)
  // Fetch categories
  const getCategories = async () => {
    try {

      const response = await axios.get(
        `http://localhost:8080/api/v1/category/fetch-category`
      );
      setCategories(response.data.Categories || []);
    } catch (error) {
      console.error(error);
      toast.error("Error while fetching categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Fetch single product by slug
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/fetch-product/${slug}`
      );
      if (data?.singleProduct) {
        setName(data.singleProduct.name);
        setDescription(data.singleProduct.description);
        setQuantity(data.singleProduct.quantity);
        setPrice(data.singleProduct.price);
        setCategory(data.singleProduct.category);
        setShipping(data.singleProduct.shipping);
        setImage(data.singleProduct.image);
        setId(data.singleProduct._id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching product details");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [slug]);

  // Update the preview whenever the image file changes
  useEffect(() => {
    if (image instanceof File) {
      const previewUrl = URL.createObjectURL(image);
      setImagePreview(previewUrl);

      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    } else {
      setImagePreview(null);
    }
  }, [image]);

  // Handle image change
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  // Handle form submission to update the product
  const handleUpdate = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (!name || !description || !price || !quantity || category === "Select Category") {
      return toast.error("Please fill out all required fields");
    }

    if (!auth?.token) {
      return toast.error("User is not authenticated. Please log in.");
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping ? "1" : "0");

      if (image instanceof File) {
        productData.append("image", image);
      }

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong");
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!auth?.token) {
      return toast.error("User is not authenticated. Please log in.");
    }

    try {
      setLoading(true)
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        setLoading(false)
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message || "Failed to delete Product");
      }
    } catch (error) {
      setLoading(true)
      console.error(error);
      toast.error("Error while deleting Product");
    }
  };

  return (
    <div className="w-full flex p-4">
      <div className="md:w-[20%] w-[30%]">
        <AdminMenu />
      </div>
      <div className="md:w-[80%] w-[70%] p-5">
        <div className="md:w-full border border-black p-10">
          <h2 className="text-xl font-bold text-center">Update Product</h2>
          <div className="w-full">
            <select
              className="my-3 bg-slate-100 p-2 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled>Select Category</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="w-full bg-slate-300 text-center p-2 font-bold">
              {image ? (image instanceof File ? image.name : "Current Image") : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>

          <div className="mb-3 flex justify-center">
            {imagePreview ? (
              <img src={`http://localhost:8080/api/v1/product/fetch-image/${id}`} alt="product-image" className="cover h-[200px]" />
            ) : (
              <img
                src={imagePreview}
                alt="product-image"
                className="cover h-[200px]"
              />
            )}
          </div>

          <div className="w-full">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="outline-none p-2 text-xl bg-slate-100 rounded-lg w-full"
              />
            </div>
            <div className="mb-3">
              <textarea
                placeholder="Description"
                value={description}
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                className="outline-none p-2 text-xl bg-slate-100 rounded-lg w-full"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="outline-none p-2 text-xl bg-slate-100 rounded-lg w-full"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="outline-none p-2 text-xl bg-slate-100 rounded-lg w-full"
              />
            </div>
            <div className="mb-3 p-2 text-xl bg-slate-100 rounded-lg">
              <select
                value={shipping ? "1" : "0"}
                onChange={(e) => setShipping(e.target.value === "1")}
                className="outline-none w-full"
              >
                <option disabled>Select Shipping</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="mb-3">
              <button
                onClick={handleUpdate}
                className="w-full bg-blue-500 py-2 text-white hover:bg-blue-700 duration-300"
              >
                Update Product
              </button>
            </div>
            <div className="mb-3">
              {loading ? (
                <Spinner />
              ) : <button
                onClick={handleDelete}
                className="w-full bg-red-500 py-2 text-white hover:bg-red-700 duration-300"
              >
                Delete Product
              </button>
              }


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
