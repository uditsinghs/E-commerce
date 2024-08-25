import UserMenu from "../../components/UserMenu"

const Profile = () => {
  return (
    <div className="w-full h-screen flex p-4">
    <div className="md:w-[20%] w-[40%]">
      <UserMenu />
    </div>
    <div className="md:w-[80%] w-[60%] md:p-5 p-3 ">
      <div className="w-full border border-black p-10 ">
        <h2>Profile</h2>
      </div>
    </div>
  </div>
  )
}

export default Profile