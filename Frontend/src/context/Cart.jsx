/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  useEffect(() => {
    let ExistingCartItems = localStorage.getItem("Product")
    if (ExistingCartItems) {
      setCart(JSON.parse(ExistingCartItems))
    }
  }, [])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
}
