import { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { useAuth } from "../../context/Auth";

const CreateCategory = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updateCategory, setUpdateCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Get categories
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        setName("");
        getCategories();
        toast.success("Category created successfully");
      } else {
        toast.error(data.message || "Failed to create category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in form submission");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        getCategories();
        toast.success("Category deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while deleting category");
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (category) => {
    setSelectedCategoryId(category._id);
    setUpdateCategory(category.name);
    document.getElementById("my_modal_5").showModal();
  };

  // Handle Update Category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selectedCategoryId}`,
        { name: updateCategory },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        getCategories();
        setUpdateCategory("");
        setSelectedCategoryId(null);
        toast.success("Category updated successfully");
        document.getElementById('my_modal_5').close()
      } else {
        toast.error(data.message || "Failed to update category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while updating category");
    }
  };

  return (
    <div className="w-full h-screen flex p-4">
      <div className="w-[20%]">
        <AdminMenu />
      </div>
      <div className="w-[80%] p-5">
        <div className="w-[50%] border border-black p-10">
          <h1 className="text-xl font-bold mb-4">Manage Category</h1>
          <div>
            <CategoryForm
              name={name}
              setName={setName}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {categories.map((c) => (
                  <tr
                    key={c._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">{c.name}</td>
                    <td className="py-3 px-6 text-left space-x-4">
                      <button
                        onClick={() => handleEditClick(c)}
                        className="py-1 px-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(c._id)}
                        className="py-1 px-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {categories.length === 0 && (
              <span className="text-blue-800 font-2xl text-center font-bold">
                No categories to show
              </span>
            )}
          </div>
        </div>

        {/* Modal code */}
        <dialog id="my_modal_5" className="modal sm:modal-middle">
          <div className="modal-box">
            <form onSubmit={handleUpdateCategory} method="dialog" className="flex flex-col">
              <div>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Update Category"
                  value={updateCategory}
                  onChange={(e) => setUpdateCategory(e.target.value)}
                />
              </div>
              <div className="flex justify-around mt-3">
                <button
                  type="submit"
                  className="py-2 px-3 bg-blue-600 rounded-lg text-white hover:bg-blue-800 duration-300"
                >
                  Update
                </button>
                <button className="btn" onClick={() => document.getElementById('my_modal_5').close()}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default CreateCategory;
