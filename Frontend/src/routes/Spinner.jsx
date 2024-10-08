/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const Spinner = ({ path = "login" }) => {
  const location = useLocation()
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevalue) => prevalue - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, {
        state: location.pathname
      });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-3">
      <div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <pre>Redirecting to you {count} second{count !== 1 ? 's' : ''}</pre>
    </div>
  );
};

export default Spinner;
