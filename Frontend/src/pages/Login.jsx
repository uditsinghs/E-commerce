import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { Link } from "react-router-dom";
// import { useLoading } from "../context/loading";
const URL = "http://localhost:8080/api/v1/users/login";

function Login() {
  const location = useLocation()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    try {
    
      const res = await axios.post(URL, {
        email,
        password,
      });

      if (res.data.success) {
        setLoading(false)
        toast.success(res.data.message);

        // Update the auth state
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        // Save updated auth to localStorage
        localStorage.setItem("auth", JSON.stringify({
          user: res.data.user,
          token: res.data.token
        }));

        // Navigate to the home page
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong! Please try again.");
      console.log(error);
    }
  };

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
              Password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 p-2 block w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <Link to="/reset-password">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Reset Password
            </button>
          </Link>
          {loading ? "loading" : <button
            type="submit"
            className="w-full mt-2 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Login
          </button>}


        </form>
      </div>
    </div>
  );
}

export default Login;
