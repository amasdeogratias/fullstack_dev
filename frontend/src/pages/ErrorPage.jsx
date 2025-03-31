import React from 'react'
import {Link} from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <Link to='/' className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Go Back Home
        </Link>
      </div>
    </section>
  )
}

export default ErrorPage
