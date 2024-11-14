import { Link } from "react-router-dom"
import UserMenu from "../../components/UserMenu"


const Orders = () => {
  return (
    <div className="w-full h-screen flex p-4">
      <div className="md:w-[20%] w-[40%]">
        <UserMenu />
      </div>
      <div className="md:w-[80%] w-[60%] md:p-5 p-3 ">
        <div className="w-full border border-black p-10 ">
          <h2>
            You have no order yet
          </h2>

        </div>
        <div className="flex justify-center my-2">
          <Link to="/checkout" className="py-2 px-3 bg-purple-500 text-center text-white">Please order</Link>
        </div>
      </div>
    </div>
  )
}

export default Orders