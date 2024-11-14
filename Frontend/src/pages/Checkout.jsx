import { useCart } from "../context/Cart";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart] = useCart();
  const [auth] = useAuth();

  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((p) => (total += p.price));
      return total.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Link
          to="/cart"
          className="text-lg text-white bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
        >
          ◀ Back to Cart
        </Link>
        <h1 className="text-center text-4xl font-extrabold text-gray-800 mt-6 mb-8">
          Checkout Summary
        </h1>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-300">
            <p className="text-lg font-semibold mb-4">
              TOTAL | PAYMENT | CHECKOUT
            </p>
            <p className="text-xl font-bold mb-4">Total Items: {cart.length}</p>
            <h2 className="text-xl font-bold mb-6">
              Total Payment: {totalPrice()}
            </h2>

            {auth?.user?.address ? (
              <>
                <h3 className="text-lg font-semibold mb-2">Current Address:</h3>
                <p className="text-gray-700 mb-4">{auth?.user?.address}</p>
                <button
                  onClick={() => navigate("/dashboard/user/profile")}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Update Address
                </button>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Update Profile
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      navigate("/login", {
                        state: "/checkout",
                      })
                    }
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
