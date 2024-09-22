import { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/category/fetch-category"
        );
        setCategories(data?.Categories || []); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []); 

  return categories; 
};

export default useCategory;
