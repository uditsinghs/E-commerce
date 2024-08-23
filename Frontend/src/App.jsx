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

function App() {
  return (
    <div className="w-full h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          < Route path="/" element={<Home />} />
          < Route path="/about" element={<About />} />
          < Route path="/login" element={<Login />} />
          < Route path="/register" element={<Register />} />
          < Route path="/contact" element={<Contact />} />
          < Route path="/cart" element={<Cart />} />
          < Route path="/policy" element={<Policy />} />
          < Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App