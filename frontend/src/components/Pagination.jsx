import React from 'react'

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const pages = [];
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (currentPage > totalPages - 3) {
          pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }
      }
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        className="px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 border rounded transition-colors ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination
