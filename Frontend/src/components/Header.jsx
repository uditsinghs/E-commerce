import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from '../context/Auth';
import { toast } from 'react-toastify';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      token: "",
      user: null,
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully")
  };

  return (
    <div className="bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              {/* Logo */}
              <div>
                <NavLink to="/" className="flex items-center py-4 px-2">
                  <img src="https://via.placeholder.com/40" alt="Logo" className="h-8 w-8 mr-2" />
                  <span className="font-semibold text-gray-500 text-lg">E-commerce</span>
                </NavLink>
              </div>
              {/* Primary Navbar items */}
              <div className="hidden md:flex items-center space-x-1">
                <NavLink to="/" className="py-4 px-2 text-gray-500 border-b-4 border-transparent hover:border-indigo-500">Home</NavLink>
                <NavLink to="/about" className="py-4 px-2 text-gray-500 border-b-4 border-transparent hover:border-indigo-500">About</NavLink>
                <NavLink to="/contact" className="py-4 px-2 text-gray-500 border-b-4 border-transparent hover:border-indigo-500">Contact</NavLink>
                <NavLink to="/policy" className="py-4 px-2 text-gray-500 border-b-4 border-transparent hover:border-indigo-500">Policy</NavLink>
              </div>
            </div>
            {/* Secondary Navbar items */}
            <div className="hidden md:flex items-center space-x-3">
              {!auth.user ? (
                <>
                  <NavLink to="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300">Log In</NavLink>
                  <NavLink to="/register" className="py-2 px-2 font-medium text-white bg-indigo-500 rounded hover:bg-indigo-400 transition duration-300">Register</NavLink>
                </>
              ) : (
                <NavLink to="/login" onClick={handleLogout} className="py-2 px-2 font-medium bg-red-500 text-white rounded hover:bg-red-800 transition duration-300">Logout</NavLink>
              )}
              <NavLink to="/cart" className="py-2 px-2 text-2xl rounded-full hover:bg-gray-200 transition duration-300"><FaCartShopping /></NavLink>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                className="outline-none mobile-menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg className="w-6 h-6 text-gray-500 hover:text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`mobile-menu ${menuOpen ? 'block' : 'hidden'} md:hidden`}>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="block py-4 px-2 text-gray-500 border-b-4 border-transparent hover:border-indigo-500">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="block py-4 px-2 text-gray-500 border-b-4 border-transparent hover:border-indigo-500">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="block py-4 px-2 text-gray-500 border-b-4 border-transparent hover:border-indigo-500">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/policy" className="block py-4 px-2 text-gray-500 border-b-4 border-transparent hover:border-indigo-500">Policy</NavLink>
            </li>
            {!auth.user ? (
              <>
                <li>
                  <NavLink to="/login" className="block py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300">Log In</NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="block py-2 px-2 font-medium text-white bg-indigo-500 rounded hover:bg-indigo-400 transition duration-300">Register</NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login" onClick={handleLogout} className="block py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300">Logout</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/cart" className="block py-2 px-2 text-2xl rounded-full hover:bg-gray-200 transition duration-300"><FaCartShopping /></NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
