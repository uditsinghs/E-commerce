import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ProductDetail = () => {
  const [product, setProduct] = useState({})
  const { slug } = useParams()
  const [relatedProducts, setRelatedProducts] = useState([])

  // similar product
  const relatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`)
      setRelatedProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/fetch-product/${slug}`)
      const singleProduct = data?.singleProduct
      console.log(singleProduct);

      if (singleProduct) {
        setProduct(singleProduct)


        if (singleProduct?._id && singleProduct?.category?._id) {
          relatedProduct(singleProduct._id, singleProduct.category._id)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProduct()
  }, [slug])


  useEffect(() => {
    console.log(product)
  }, [product])

  return (
    <div>
      <span className='text-xl ml-4 mt-2 font-bold'>  <Link to="/">Home⏪</Link></span>

      <div className='grid grid-cols-2'>
        <div className='m-4 shadow-lg rounded-lg w-[60%]'>
          <img src={product.image} alt="product-image" />
        </div>

        <div className='flex justify-center flex-col '>
          <h1 className="text-center text-2xl font-bold mt-4">Product Detail</h1>
          <p className='text-xl mt-2'><span className='font-bold text-2xl'>Product Name:</span> {product.name}</p>
          <p className='text-xl mt-2'><span className='font-bold text-2xl'>Description:</span> {product.description}</p>
          <p className='text-xl mt-2'><span className='font-bold text-2xl'>Price:</span> {product.price}</p>
          <p className='text-xl mt-2'><span className='font-bold text-2xl'>Category:</span> {product?.category?.name}</p>
          <button className="py-2 px-2 text-white bg-gray-500 rounded-lg hover:bg-gray-700 duration-300 ">Add to Cart</button>
        </div>
      </div>

      <div>
        <h1 className='font-extrabold text-center text-3xl ml-20'>{relatedProducts?.length === 0 ? "No Related Products" : "Related Products"}</h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 p-4">
          {relatedProducts?.map((p) => (
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
      <span>

      </span>

    </div>
  )
}

export default ProductDetail
