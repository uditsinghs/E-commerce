import AdminMenu from "../../components/AdminMenu"
import { useAuth } from "../../context/Auth"


const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <div className="w-full h-screen flex p-4">
      <div className="md:w-[20%] w-[40%]">
        <AdminMenu />
      </div>
      <div className="md:w-[80%] w-[60%] md:p-5 p-3 ">
        <div className="w-full border border-black p-10 ">
          <h2 className="text-xl font-bold ">User Name: <span className="">{auth?.user?.name}</span>
          </h2>
          <h2 className="text-xl ">User Email: {auth?.user?.email}</h2>
          <h2 className="text-xl ">User Number: {auth?.user?.phone}</h2>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard