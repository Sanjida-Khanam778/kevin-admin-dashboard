import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ setCurrentPage, currentPage }) {
  const indexOfLastItem = currentPage * 9;
  const endItems = Math.min(currentPage * 9, 15);
  const indexOfFirstItem = indexOfLastItem - 9;
  const totalPages = Math.ceil(15 / 9);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  return (
    <div className="px-6 py-4 border-t border-borderGray flex items-center justify-between bottom-0">
      <div>
        <p className="text-sm text-primary font-medium">
          Showing data {indexOfFirstItem + 1} to {endItems} of {15} entries
        </p>
      </div>
      <div className="flex space-x-2">
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
              className={`px-3 py-1 rounded-lg mr-2 ${
                currentPage === pageNum
                  ? "bg-primary text-white"
                  : "text-gray-600 bg-neutral/10"
              }`}
            >
              {pageNum}
            </button>
          )
        )}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-lg ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600"
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
