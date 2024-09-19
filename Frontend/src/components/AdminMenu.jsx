import { Link } from 'react-router-dom'
const AdminMenu = () => {
  return (
    <>
      <div className="w-full bg-gray-100">
        <h1 className='text-center font-bold text-xl'>Admin Menu</h1>
        <ul className="flex flex-col justify-center ">
          <li className="mx-4 border">
            <Link to="/dashboard/admin" className="p-4 hover:bg-blue-500 hover:text-white cursor-pointer block">
              Home
            </Link>
          </li>
          <li className="mx-4 border">
            <Link to="/dashboard/admin/create-category" className="p-4 hover:bg-blue-500 hover:text-white cursor-pointer block">
              Create Category
            </Link>
          </li>
          <li className="mx-4 border">
            <Link to="/dashboard/admin/create-product" className="p-4 hover:bg-blue-500 hover:text-white  cursor-pointer block">
              Create Product
            </Link>
          </li>
          <li className="mx-4 border">
            <Link to="/dashboard/admin/products" className="p-4 hover:bg-blue-500 hover:text-white  cursor-pointer block">
              Products
            </Link>
          </li>
          <li className="mx-4 border">
            <Link to="/dashboard/admin/users" className="p-4 hover:bg-blue-500 hover:text-white  cursor-pointer block">
              Users
            </Link>
          </li>
        </ul>
      </div>

    </>
  )
}

export default AdminMenu