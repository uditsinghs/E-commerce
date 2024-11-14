import { useAuth } from "../context/Auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);

    setCart(updatedCart);
    localStorage.setItem("Product",JSON.stringify(updatedCart))
    
  };

  return (
    <div className="container mx-auto p-4">

      <p className="text-center pt-3 text-2xl">
        Hello {auth?.user?.name ? auth.user.name : "Guest"}
      </p>


      <p className="text-center text-xl my-4">
        {cart?.length > 0
          ? `You have ${cart.length} item${cart.length > 1 ? "s" : ""} in your cart ${auth?.token ? "" : "Please login to checkout"
          }`
          : "Your cart is empty"}
      </p>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cart?.map((p) => (
          <div key={p._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-64 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{p.name}</h2>
              <p>{p.description}</p>
              <div className="card-actions justify-between items-center">
                <div className="badge badge-outline">${p.price}</div>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => removeFromCart(p._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Button */}
      {cart?.length > 0 && auth?.token && (
        <div className="text-center mt-6">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
