import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setQuery } from '../store/slices/searchSlice';
import { fetchAnimeSearch } from '../store/slices/searchSlice';
import FiltersPanel from './FiltersPanel';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { query, filters } = useAppSelector((state) => state.search);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // If query is empty, clear results
    if (!query.trim()) {
      return;
    }

    // Set new timer for debounced search
    // Always search from page 1 when query changes
    debounceTimerRef.current = setTimeout(() => {
      dispatch(fetchAnimeSearch({ query, page: 1, filters }));
    }, 250);

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, filters, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showFilters &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    dispatch(setQuery(newQuery));
  };

  return (
    <div id="search-bar" ref={containerRef} className="w-full max-w-4xl mx-auto mb-8">
      <div className="relative">
        <div className="flex items-center bg-gray-900/70 backdrop-blur rounded-2xl border border-gray-700 px-4 py-3 shadow-lg shadow-black/30">
          <svg
            className="w-5 h-5 text-gray-500 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for anime..."
            className="flex-1 bg-transparent text-gray-100 placeholder:text-gray-500 text-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="ml-3 flex items-center justify-center rounded-2xl border border-gray-600 px-3 py-2 text-gray-200 hover:bg-gray-800/70 transition"
            aria-expanded={showFilters}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M7 12h10m-6 6h6"
              />
            </svg>
          </button>
        </div>
        {showFilters && (
          <div className="mt-4">
            <FiltersPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

