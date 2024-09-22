import { useSearch } from "../context/Search";
import { Link } from "react-router-dom";

const Search = () => {
  const [values] = useSearch();
  console.log(values);


  return (
    <div>
      <h1 className="text-center font-bold text-xl mt-3">Search Results</h1>
      <h6 className="ml-12 text-xl  font-bold">
        {values?.results.result.length < 1 ? "No Products Found" : `Found ${values?.results.result.length} Products`}
      </h6>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2 p-4">
        {values?.results?.result?.map((p) => (
          <div key={p._id} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src={p.image || 'https://via.placeholder.com/150'} 
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{p.name}</h2>
              <p>{p.description}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">${p.price}</div>
                <div className="badge badge-outline">{p.quantity} in stock</div>
              </div>
            </div>
            <div className="flex justify-evenly gap-4 p-2">
              <Link
                to={`/product/${p.slug}`} 
                className="py-2 px-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 duration-300"
              >
                More Details
              </Link>
              <button className="py-2 px-2 text-white bg-gray-500 rounded-lg hover:bg-gray-700 duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
