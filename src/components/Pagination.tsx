import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPage, fetchAnimeSearch } from '../store/slices/searchSlice';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { pagination, currentPage, query, loading, filters } = useAppSelector(
    (state) => state.search
  );

  if (!pagination || pagination.last_visible_page <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagination.last_visible_page || loading) {
      return;
    }
    dispatch(setPage(page));
    dispatch(fetchAnimeSearch({ query, page, filters }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const totalPages = pagination.last_visible_page;
    const current = currentPage;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (current >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        Previous
      </button>

      <div className="flex gap-1">
        {renderPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 py-2">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              disabled={loading}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                currentPage === pageNum
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pagination.last_visible_page || loading}
        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

