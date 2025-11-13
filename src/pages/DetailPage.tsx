import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAnimeDetail } from '../store/slices/animeDetailSlice';
import SkeletonLoader from '../components/SkeletonLoader';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { anime, loading, error } = useAppSelector(
    (state) => state.animeDetail
  );

  useEffect(() => {
    if (id) {
      const animeId = parseInt(id, 10);
      if (!isNaN(animeId)) {
        dispatch(fetchAnimeDetail(animeId));
      }
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <SkeletonLoader />
          </div>
        </div>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-900/20 border border-red-600/40 text-red-300 px-4 py-3 rounded-lg mb-4">
              <p className="font-semibold">Error:</p>
              <p>{error || 'Anime not found'}</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl =
    anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || '';
  const title = anime.title || 'Untitled';
  const titleEnglish = anime.title_english;
  const titleJapanese = anime.title_japanese;
  const synopsis = anime.synopsis;
  const score = anime.score;
  const rank = anime.rank;
  const popularity = anime.popularity;
  const members = anime.members;
  const episodes = anime.episodes;
  const status = anime.status;
  const type = anime.type;
  const source = anime.source;
  const duration = anime.duration;
  const rating = anime.rating;
  const aired = anime.aired?.string;
  const season = anime.season;
  const year = anime.year;
  const studios = anime.studios || [];
  const genres = anime.genres || [];
  const producers = anime.producers || [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          aria-label="Back to search"
          className="mb-6 inline-flex items-center gap-3 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-neutral-100 rounded-md shadow-md transition-colors"
        >
          <svg
            className="w-5 h-5 text-neutral-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back to Search</span>
        </button>

        <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Image on top (full width) */}
          <div className="w-full">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-96 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/400x600?text=No+Image';
              }}
            />
          </div>

          <div className="p-8">
            {/* Header: title box + quick metrics */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-900 to-red-400 text-white p-4 rounded-lg shadow-md flex-1">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">{title}</h1>
                {titleEnglish && titleEnglish !== title && (
                  <p className="text-sm text-indigo-100 opacity-90 mt-1">{titleEnglish}</p>
                )}
                {titleJapanese && (
                  <p className="text-sm text-indigo-100/80 mt-1">{titleJapanese}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {score && (
                  <div className="bg-gray-700 p-2 rounded-lg text-center w-24">
                    <p className="text-xs text-neutral-300">Score</p>
                    <p className="text-lg font-bold text-blue-300">{score.toFixed(1)}</p>
                  </div>
                )}
                {rank && (
                  <div className="bg-gray-700 p-2 rounded-lg text-center w-24">
                    <p className="text-xs text-neutral-300">Rank</p>
                    <p className="text-lg font-bold text-green-300">#{rank}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {score && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-neutral-300">Score</p>
                  <p className="text-2xl font-bold text-blue-300">
                    {score.toFixed(1)}
                  </p>
                </div>
              )}
              {rank && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-neutral-300">Rank</p>
                  <p className="text-2xl font-bold text-green-300">#{rank}</p>
                </div>
              )}
              {popularity && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-neutral-300">Popularity</p>
                  <p className="text-2xl font-bold text-purple-300">#{popularity}</p>
                </div>
              )}
              {members && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-neutral-300">Members</p>
                  <p className="text-lg font-bold text-yellow-300">
                    {members.toLocaleString()}
                  </p>
                </div>
              )}
              {episodes && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-neutral-300">Episodes</p>
                  <p className="text-2xl font-bold text-indigo-300">{episodes}</p>
                </div>
              )}
              {status && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-neutral-300">Status</p>
                  <p className="text-lg font-bold text-pink-300">{status}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {type && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-neutral-300">Type</p>
                  <p className="font-semibold text-neutral-100">{type}</p>
                </div>
              )}
              {source && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-neutral-300">Source</p>
                  <p className="font-semibold text-neutral-100">{source}</p>
                </div>
              )}
              {duration && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-neutral-300">Duration</p>
                  <p className="font-semibold text-neutral-100">{duration}</p>
                </div>
              )}
              {rating && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-neutral-300">Rating</p>
                  <p className="font-semibold text-neutral-100">{rating}</p>
                </div>
              )}
              {aired && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-neutral-300">Aired</p>
                  <p className="font-semibold text-neutral-100">{aired}</p>
                </div>
              )}
              {season && year && (
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-neutral-300">Season</p>
                  <p className="font-semibold text-neutral-100">{season} {year}</p>
                </div>
              )}
            </div>

            {studios.length > 0 && (
              <div className="mb-4">
                <span className="font-semibold text-neutral-200">Studios: </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {studios.map((studio) => (
                    <span
                      key={studio.mal_id}
                      className="px-3 py-1 bg-blue-700 text-blue-100 rounded-full text-sm"
                    >
                      {studio.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {producers.length > 0 && (
              <div className="mb-4">
                <span className="font-semibold text-neutral-200">Producers: </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {producers.slice(0, 5).map((producer) => (
                    <span
                      key={producer.mal_id}
                      className="px-3 py-1 bg-green-700 text-green-100 rounded-full text-sm"
                    >
                      {producer.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {genres.length > 0 && (
              <div className="mb-6">
                <span className="font-semibold text-neutral-200">Genres: </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {genres.map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="px-3 py-1 bg-purple-700 text-purple-100 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {synopsis && (
              <div>
                <h2 className="text-xl font-semibold text-neutral-100 mb-3">Synopsis</h2>
                <p className="text-neutral-300 leading-relaxed">{synopsis}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

