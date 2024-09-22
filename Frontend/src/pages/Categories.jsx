import useCategory from "../../../Backend/src/hooks/useCategory"
import { Link } from "react-router-dom"
const Categories = () => {
  const categories = useCategory()
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-5 ">All Categories</h1>
      <div className="flex  flex-col items-center gap-10">

        {categories.map((c => (
          <>
            <ul key={c._id} className="p-3">
              <Link to={`/category/${c.slug}`} className="py-2 px-3 rounded-lg bg-blue-400 text-white hover:bg-blue-900 duration-300">{c.name}</Link>
            </ul>

          </>

        )))}


      </div>
    </div>
  )
}

export default Categories