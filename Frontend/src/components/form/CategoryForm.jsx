/* eslint-disable react/prop-types */

const CategoryForm = ({ handleSubmit, name, setName }) => {
  return (
    <>
      <div>
        <div className="w-full max-w-xs">
          <form onSubmit={handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Create Category" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <button type="submit" className="py-2 px-3 bg-blue-600 rounded-lg text-white hover:bg-blue-800 duration-300">Create</button>
          </form>

        </div>
      </div>

    </>
  )
}

export default CategoryForm