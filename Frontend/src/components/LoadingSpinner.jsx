

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Loader Circle */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
      {/* Optional Loader Text */}
      <span className="ml-4 text-lg sm:text-xl lg:text-2xl font-medium text-gray-700">Loading...</span>
    </div>
  )
}

export default LoadingSpinner