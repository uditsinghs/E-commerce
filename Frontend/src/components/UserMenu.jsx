import { Link } from "react-router-dom"

const UserMenu = () => {
  return (
    <div className="w-full bg-gray-100">
      <h1 className='text-center font-bold text-2xl'>Dashboard</h1>
      <ul className="flex flex-col justify-center ">
        <li className="mx-4 border">
          <Link to="/dashboard/user" className="p-4 hover:bg-blue-500 hover:text-white cursor-pointer block">
          Home
          </Link>
        </li>
        <li className="mx-4 border">
          <Link to="/dashboard/user/profile " className="p-4 hover:bg-blue-500 hover:text-white cursor-pointer block">
      Profile
          </Link>
        </li>
        <li className="mx-4 border">
          <Link to="/dashboard/user/orders" className="p-4 hover:bg-blue-500 hover:text-white cursor-pointer block">
          orders
          </Link>
        </li>
      
      </ul>
    </div>

  )
}

export default UserMenu