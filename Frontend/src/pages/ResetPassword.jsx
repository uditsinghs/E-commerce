import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const URL = "http://localhost:8080/api/v1/users/forget-password";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  // const [auth, setAuth] = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL, {
        email,
        newPassword,
        answer
      });

      if (res.data.success) {
        toast.success(res.data.message);
        // Navigate to the home page
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter your Email"
              className="mt-1 p-2 block w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              autoComplete="off"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 p-2 block w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              who's is your Best Friend..?
            </label>
            <input
              type="text"
              autoComplete="off"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              name="email"
              placeholder="Enter your BestFriend Name"
              className="mt-1 p-2 block w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="w-full mt-2 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Reset
          </button>

        </form>
      </div>
    </div>
  )
}

export default ResetPassword