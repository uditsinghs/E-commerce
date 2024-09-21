import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  // let results = values.results;

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate('/search');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="input input-bordered flex items-center gap-2" onSubmit={handleSearch}>
      <input
        type="text"
        className="grow"
        placeholder="Search"
        value={values.keyword} // Assuming 'keyword' is the correct field
        onChange={(e) => setValues({ ...values, keyword: e.target.value })} // Correct 'keyword' field
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </form>
  );
};

export default SearchInput;
