/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const SingleCategory = () => {
  const [categoryProduct, setCategoryProduct] = useState([])
  const [categoryName,setCategoryName]  =useState('')
  const { slug } = useParams()
  const getCategoryWiseProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/fetch-categorywise/${slug}`)
      setCategoryProduct(data?.products)
      setCategoryName(data?.category)
    } catch (error) {
      console.log(error
      );

    }
  }
  useEffect(() => {
    getCategoryWiseProduct()
  }, [slug])
  return (
    <div>
      <h1 className='text-3xl text-center font-bold mt-4'>{`${categoryName.name} Products`}</h1>
      <h1 className='text-3xl text-center'>{`${categoryProduct.length} Product Found`}</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2 p-4">
        {categoryProduct?.map((p) => (
          <div key={p._id} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {p.name}
              </h2>
              <p>{p.description}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">${p.price}</div>
                <div className="badge badge-outline">{p.quantity}</div>
              </div>
            </div>
            <div className="flex justify-evenly gap-4 p-2">
              <Link
                to={`/product/${p.slug}`}
                className="py-2 px-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 duration-300 ">More Details</Link>
              <button className="py-2 px-2 text-white bg-gray-500 rounded-lg hover:bg-gray-700 duration-300 ">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SingleCategory