import AdminMenu from "../../components/AdminMenu"


const CreateProduct = () => {
  return (
    <div className="w-full h-screen flex p-4">
      <div className="w-[20%]">
        <AdminMenu />
      </div>
      <div className="w-[80%] p-5">
        <div className="w-[50%] border border-black p-10">
        <h2>Create-product</h2>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct