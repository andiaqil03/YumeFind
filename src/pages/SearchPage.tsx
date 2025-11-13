import { useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAnimeSearch } from '../store/slices/searchSlice';
import { fetchTopAnime } from '../store/slices/heroCarouselSlice';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';
import SkeletonLoader from '../components/SkeletonLoader';
import HeroCarousel from '../components/HeroCarousel';

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { results, loading, error, query, currentPage, filters } = useAppSelector(
    (state) => state.search
  );
  const { animes: heroAnimes, loading: heroLoading } = useAppSelector(
    (state) => state.heroCarousel
  );
  const hasActiveFilters = useMemo(() => {
    if (!filters) return false;
    if (filters.type) return true;
    if (filters.status) return true;
    if (filters.rating) return true;
    if (Array.isArray(filters.genres) && filters.genres.length > 0) return true;
    if (Array.isArray(filters.genresExclude) && filters.genresExclude.length > 0)
      return true;
    if (typeof filters.minScore === 'number') return true;
    if (typeof filters.maxScore === 'number') return true;
    if (typeof filters.year === 'number') return true;
    if (filters.sfw === false) return true;
    if (filters.orderBy && filters.orderBy !== 'score') return true;
    if (filters.sort && filters.sort !== 'desc') return true;
    return false;
  }, [filters]);
  const initialFetchDoneRef = useRef(false);

  useEffect(() => {
    if (query.trim() === '' && !hasActiveFilters) {
      initialFetchDoneRef.current = false;
    } else {
      initialFetchDoneRef.current = true;
    }
  }, [query, hasActiveFilters]);

  useEffect(() => {
    // Fetch top anime on component mount
    dispatch(fetchTopAnime());
  }, [dispatch]);

  useEffect(() => {
    if (initialFetchDoneRef.current) {
      return;
    }
    if (!loading && results.length === 0 && query.trim() === '' && !hasActiveFilters) {
      initialFetchDoneRef.current = true;
      dispatch(fetchAnimeSearch({ query: '', page: 1, filters }));
    }
  }, [dispatch, loading, results.length, query, filters, hasActiveFilters]);

  useEffect(() => {
    if (query.trim() && results.length === 0 && !loading) {
      dispatch(fetchAnimeSearch({ query, page: currentPage, filters }));
    }
  }, [dispatch, query, currentPage, results.length, loading, filters]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {!heroLoading && heroAnimes.length > 0 && (
          <HeroCarousel animes={heroAnimes} />
        )}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-100 mb-2">
            YumeFind ✨
          </h1>
          <p className="text-neutral-400">Every search begins with a dream.</p>
        </div>

        <SearchBar />

        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-900/20 border border-red-600/40 text-red-300 rounded-lg">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {loading && results.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(10)].map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        )}

        {!loading && query.trim() && results.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-neutral-200 mb-2">
              No results found
            </h2>
            <p className="text-neutral-400">
              Try searching with different keywords
            </p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

