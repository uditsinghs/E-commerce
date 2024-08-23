
import { Link } from 'react-router-dom'
function PageNotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className=" flex flex-col gap-2 justify-center items-center w-[300px] h-[300px] bg-slate-400 text-white rounded-xl">
        <h1 className='text-xl font-bold '>OOP's Page not found</h1>
        <p className='text-md '>Page not available you are looking for</p>
        <Link to="/"><button className='py-1 px-2 bg-blue-700 text-white rounded-md '>Go Back</button></Link>
      </div>
    </div>
  )
}

export default PageNotFound