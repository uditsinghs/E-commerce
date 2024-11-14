import { toast } from "react-toastify";
import AdminMenu from "../../components/AdminMenu"
import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [user, setUser] = useState([])
  const getAllusers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/users/getall")
      setUser(data.users)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);

    }
  }
  useEffect(() => {
    getAllusers()
  }, [])
  console.log(user);

  return (
    <div className="w-full h-screen flex p-4">
      <div className="w-[20%]">
        <AdminMenu />
      </div>
      <div className="w-[80%] p-5">
        {user?.map((u) => {
          return (
            <div key={u._id} className="w-[50%] border border-black p-10">
              <h2>{u.name}</h2>
              <h2>{u.phone}</h2>
              <h2>{u.address}</h2>
              <h2>{u.email}</h2>

            </div>
          )
        })}

      </div>
    </div>
  )
}

export default Users