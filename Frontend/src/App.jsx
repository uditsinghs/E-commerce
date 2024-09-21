import Footer from "./components/Footer"
import Header from "./components/Header"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import PageNotFound from "./pages/PageNotFound"
import Register from './pages/Register'
import Login from "./pages/Login"
import Contact from "./pages/Contact"
import Cart from './pages/Cart'
import Policy from './pages/Policy'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/user/Dashboard"
import PrivateRoute from "./routes/PrivateRoute"
import ResetPassword from "./pages/ResetPassword"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminRoute from "./routes/AdminRoute"
import CreateCategory from "./pages/admin/CreateCategory"
import CreateProduct from "./pages/admin/CreateProduct"
import Users from "./pages/admin/Users"
import Orders from "./pages/user/Orders"
import Profile from "./pages/user/Profile"
import Products from "./pages/admin/Products"
import UpdateProduct from "./pages/admin/UpdateProduct"
import Search from "./pages/Search"
// import UpdateCategory from "./pages/admin/UpdateCategory"

function App() {
  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          < Route path="/" element={<Home />} />
          
          < Route path="/search" element={<Search />} />

          < Route path="/about" element={<About />} />
          < Route path="/dashboard/user" element={<PrivateRoute />}>
            < Route path="" element={<Dashboard />} />
            < Route path="/dashboard/user/orders" element={<Orders />} />
            < Route path="/dashboard/user/profile" element={<Profile />} />
          </Route>
          < Route path="/dashboard/admin" element={<AdminRoute />}>
            < Route path="" element={<AdminDashboard />} />
            < Route path="/dashboard/admin/create-category" element={<CreateCategory />} />
            < Route path="/dashboard/admin/create-product" element={<CreateProduct />} />
            < Route path="/dashboard/admin/create-product" element={<CreateProduct />} />
            < Route path="/dashboard/admin/products" element={<Products />} />
            < Route path="/dashboard/admin/:slug" element={<UpdateProduct />} />

            < Route path="/dashboard/admin/users" element={<Users />} />
          </Route>
          < Route path="/login" element={<Login />} />
          < Route path="/reset-password" element={<ResetPassword />} />
          < Route path="/register" element={<Register />} />
          < Route path="/contact" element={<Contact />} />
          < Route path="/cart" element={<Cart />} />
          < Route path="/policy" element={<Policy />} />
          < Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"

      />
    </div>
  )
}

export default App