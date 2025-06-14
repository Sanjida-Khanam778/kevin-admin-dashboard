import React from "react";

export default function Pagination() {
  return (
    <div className="px-6 py-4 border-t border-borderGray flex items-center justify-between bottom-0">
      <div>
        <p className="text-sm text-primary font-medium">
          Showing data 1 to 10 of 256K entries
        </p>
      </div>
      <div className="flex space-x-1">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-border border-borderGray"
          }`}
        >
          <ChevronLeft size={18} />
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          // Always show first page
          if (i === 0) return 1;
          // Always show last page if we have more than 5 pages
          if (totalPages > 5 && i === 4) return totalPages;
          // Calculate the middle pages based on current page
          let pageNum;
          if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          // If we're showing the last page as our 5th button, maybe add ellipsis
          if (totalPages > 5 && i === 3) return "...";
          return pageNum;
        }).map((pageNum, i) =>
          pageNum === "..." ? (
            <span key={`ellipsis-${i}`} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={`page-${pageNum}`}
              onClick={() => goToPage(pageNum)}
              className={`px-3 py-1 rounded-full ${
                currentPage === pageNum
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-border border-borderGray"
              }`}
            >
              {pageNum}
            </button>
          )
        )}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-border border-borderGray"
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
