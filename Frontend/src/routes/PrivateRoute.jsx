import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/users/user-auth', {
          headers: {
            "Authorization": `Bearer ${auth?.token}`
          }
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setOk(false);
      }
    };
    
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}

export default PrivateRoute;
