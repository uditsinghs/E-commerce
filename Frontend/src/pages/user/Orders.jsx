import UserMenu from "../../components/UserMenu"


const Orders = () => {
  return (
    <div className="w-full h-screen flex p-4">
      <div className="md:w-[20%] w-[40%]">
        <UserMenu />
      </div>
      <div className="md:w-[80%] w-[60%] md:p-5 p-3 ">
        <div className="w-full border border-black p-10 ">
          <h2>orders</h2>
        </div>
      </div>
    </div>
  )
}

export default Orders