import UserMenu from "../../components/UserMenu"
import { useAuth } from "../../context/Auth"
function Dashboard() {
  const [auth] = useAuth()
  return (
    <div className="w-full h-screen flex p-4">
      <div className="md:w-[20%] w-[40%]">
        <UserMenu />
      </div>
      <div className="md:w-[70%] w-[60%] md:p-5 p-3 ">
        <div className="w-full border border-black p-10 ">
          <h2 className="text-xl font-bold ">User Name: <span className="">{auth?.user?.name}</span>
          </h2>
          <h2 className="text-xl ">User Number: {auth?.user?.phone}</h2>
          <h2 className="text-xl ">User Address: {auth?.user?.address}</h2>

        </div>
      </div>
    </div>
  )
}

export default Dashboard