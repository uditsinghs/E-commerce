import UserMenu from "../../components/UserMenu";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/users/update-profile",
        { name, email, phone, address },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({
          ...auth,
          user: data?.updatedUser,
        });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("User profile updated successfully");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.log(error);
    }
  };

  useEffect(() => {
    const { name, email, phone, address } = auth.user;
    setName(name);
    setAddress(address);
    setEmail(email);
    setPhone(phone);
  }, [auth.user]);
  return (
    <div className="w-full h-full flex p-4">
      <div className="md:w-[20%] w-[40%]">
        <UserMenu />
      </div>
      <div className="md:w-[80%] w-[60%] md:p-5 p-3 ">
        <div className="w-full border border-black p-10 ">
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-sky-300 ">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    value={name}
                    autoComplete="off"
                    className="mt-1 p-2 block w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"

                  />
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    className="mt-1 p-2 block w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Password Field */}

                {/* Phone Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    autoComplete="off"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="mt-1 p-2 block w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"

                  />
                </div>

                {/* Address Field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    autoComplete="off"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="mt-1 p-2 block w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"

                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
