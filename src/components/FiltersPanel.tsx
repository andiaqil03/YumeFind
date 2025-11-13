import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilters, fetchAnimeSearch } from '../store/slices/searchSlice';

const GENRE_OPTIONS: Array<{ id: number; name: string }> = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 4, name: 'Comedy' },
  { id: 7, name: 'Mystery' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 14, name: 'Horror' },
  { id: 18, name: 'Mecha' },
  { id: 19, name: 'Music' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Sci-Fi' },
  { id: 30, name: 'Sports' },
  { id: 36, name: 'Slice of Life' },
  { id: 37, name: 'Supernatural' },
  { id: 40, name: 'Psychological' },
];

const FiltersPanel = () => {
  const dispatch = useAppDispatch();
  const { filters, query } = useAppSelector((state) => state.search);
  const [expanded, setExpanded] = useState(false);

  const selectedGenreSet = useMemo(
    () => new Set(filters.genres || []),
    [filters.genres]
  );

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.type) count++;
    if (filters.status) count++;
    if (filters.rating) count++;
    if (filters.genres && filters.genres.length > 0) count++;
    if (typeof filters.minScore === 'number') count++;
    if (typeof filters.maxScore === 'number') count++;
    if (typeof filters.year === 'number') count++;
    // orderBy/sort/sfw are defaults; don't count unless changed from defaults
    if (filters.orderBy && filters.orderBy !== 'score') count++;
    if (filters.sort && filters.sort !== 'desc') count++;
    if (filters.sfw === false) count++;
    return count;
  }, [filters]);

  const handleChange = (partial: any) => {
    const nextFilters = { ...filters, ...partial };
    dispatch(setFilters(partial));
    // Trigger search immediately with updated filters, even if query is empty
    dispatch(
      fetchAnimeSearch({
        query: query || '',
        page: 1,
        filters: nextFilters,
      })
    );
  };

  const clearAll = () => {
    const resetFilters = {
      type: undefined,
      status: undefined,
      rating: undefined,
      genres: [] as number[],
      genresExclude: [] as number[],
      minScore: undefined as number | undefined,
      maxScore: undefined as number | undefined,
      year: undefined as number | undefined,
      orderBy: 'score' as const,
      sort: 'desc' as const,
      sfw: true,
    };
    dispatch(setFilters(resetFilters));
    dispatch(
      fetchAnimeSearch({
        query: query || '',
        page: 1,
        filters: { ...filters, ...resetFilters },
      })
    );
  };

  const toggleGenre = (id: number) => {
    const next = new Set(selectedGenreSet);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    handleChange({ genres: Array.from(next) });
  };

  return (
    <div className="w-full bg-gray-900/70 backdrop-blur rounded-2xl border border-gray-800 p-4 shadow-lg shadow-black/30">
      {/* Header row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="font-semibold text-gray-100">Filters</div>
        {activeFiltersCount > 0 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            {activeFiltersCount} active
          </span>
        )}
        <div className="flex-1" />
        <button
          className="text-sm text-gray-300 hover:text-gray-100 px-2 py-1 rounded-lg hover:bg-gray-800/80"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? 'Hide' : 'More'} filters
        </button>
        <button
          className="text-sm px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-800/70 text-gray-200"
          onClick={clearAll}
        >
          Clear
        </button>
      </div>

      {/* Quick row - compact, interactive controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Type chips */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 mr-1">Type:</span>
          {['tv', 'movie', 'ova'].map((t) => (
            <button
              key={t}
              className={`text-xs px-2.5 py-1 rounded-full border transition ${
                filters.type === t
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-700 hover:bg-gray-800/70 text-gray-200'
              }`}
              onClick={() =>
                handleChange({ type: filters.type === t ? undefined : (t as any) })
              }
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Status chips */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 mr-1">Status:</span>
          {[
            { key: 'airing', label: 'Airing' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'complete', label: 'Complete' },
          ].map((s) => (
            <button
              key={s.key}
              className={`text-xs px-2.5 py-1 rounded-full border transition ${
                filters.status === s.key
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'border-gray-700 hover:bg-gray-800/70 text-gray-200'
              }`}
              onClick={() =>
                handleChange({
                  status: filters.status === s.key ? undefined : (s.key as any),
                })
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Rating select (compact) */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">Rating:</span>
          <select
            className="text-sm border rounded-md px-2 py-1 bg-gray-950 text-gray-100 border-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30"
            value={filters.rating || ''}
            onChange={(e) =>
              handleChange({ rating: (e.target.value || undefined) as any })
            }
          >
            <option value="">Any</option>
            <option value="g">G</option>
            <option value="pg">PG</option>
            <option value="pg13">PG-13</option>
            <option value="r17">R-17</option>
            <option value="r">R</option>
            <option value="rx">RX</option>
          </select>
        </div>

        {/* Score compact inputs */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">Score:</span>
          <input
            className="w-16 text-sm border rounded-md px-2 py-1 bg-gray-950 text-gray-100 border-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30"
            type="number"
            min={0}
            max={10}
            step="0.1"
            placeholder="Min"
            value={typeof filters.minScore === 'number' ? filters.minScore : ''}
            onChange={(e) =>
              handleChange({
                minScore: e.target.value === '' ? undefined : Number(e.target.value),
              })
            }
          />
          <span className="text-xs text-gray-500">-</span>
          <input
            className="w-16 text-sm border rounded-md px-2 py-1 bg-gray-950 text-gray-100 border-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30"
            type="number"
            min={0}
            max={10}
            step="0.1"
            placeholder="Max"
            value={typeof filters.maxScore === 'number' ? filters.maxScore : ''}
            onChange={(e) =>
              handleChange({
                maxScore: e.target.value === '' ? undefined : Number(e.target.value),
              })
            }
          />
        </div>

        {/* Year */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">Year:</span>
          <input
            className="w-24 text-sm border rounded-md px-2 py-1 bg-gray-950 text-gray-100 border-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30"
            type="number"
            min={1960}
            max={2100}
            placeholder="e.g. 2025"
            value={typeof filters.year === 'number' ? filters.year : ''}
            onChange={(e) =>
              handleChange({
                year: e.target.value === '' ? undefined : Number(e.target.value),
              })
            }
          />
        </div>

        {/* SFW switch */}
        <button
          className={`ml-auto text-xs px-2.5 py-1 rounded-full border transition ${
            filters.sfw
              ? 'bg-purple-500 text-white border-purple-500'
              : 'border-gray-700 hover:bg-gray-800/70 text-gray-200'
          }`}
          onClick={() => handleChange({ sfw: !filters.sfw })}
          aria-pressed={!!filters.sfw}
        >
          {filters.sfw ? 'SFW' : 'NSFW'}
        </button>
      </div>

      {/* Collapsible advanced */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Order by / Sort */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400">Order:</span>
              <select
                className="text-sm border rounded-md px-2 py-1 bg-gray-950 text-gray-100 border-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30"
                value={filters.orderBy || 'score'}
                onChange={(e) =>
                  handleChange({ orderBy: (e.target.value || undefined) as any })
                }
              >
                <option value="score">Score</option>
                <option value="popularity">Popularity</option>
                <option value="favorites">Favorites</option>
                <option value="rank">Rank</option>
                <option value="members">Members</option>
                <option value="episodes">Episodes</option>
                <option value="start_date">Start Date</option>
                <option value="title">Title</option>
              </select>
              <select
                className="text-sm border rounded-md px-2 py-1 bg-gray-950 text-gray-100 border-gray-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30"
                value={filters.sort || 'desc'}
                onChange={(e) =>
                  handleChange({ sort: (e.target.value || undefined) as any })
                }
              >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>

            {/* Genres tokens */}
            <div className="min-w-[220px]">
              <div className="text-xs text-gray-400 mb-1">Genres</div>
              <div className="flex flex-wrap gap-2">
                {GENRE_OPTIONS.map((g) => (
                  <button
                    key={g.id}
                    className={`text-xs px-2.5 py-1 rounded-full border transition ${
                      selectedGenreSet.has(g.id)
                        ? 'bg-indigo-500 text-white border-indigo-500'
                    : 'border-gray-700 hover:bg-gray-800/70 text-gray-200'
                    }`}
                    onClick={() => toggleGenre(g.id)}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPanel;


