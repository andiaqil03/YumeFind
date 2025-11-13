import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Anime } from '../types/anime';

interface HeroCarouselProps {
  animes: Anime[];
}

const HeroCarousel = ({ animes }: HeroCarouselProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  useEffect(() => {
    if (animes.length === 0) return;

    const interval = setInterval(() => {
      setNextIndex((prev) => (prev === null ? (currentIndex + 1) % animes.length : (prev + 1) % animes.length));
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % animes.length);
        setNextIndex(null);
      }, 500);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [animes.length, currentIndex]);

  if (animes.length === 0) return null;

  const currentAnime = animes[currentIndex];
  const imageUrl =
    currentAnime.images?.jpg?.large_image_url ||
    currentAnime.images?.jpg?.image_url ||
    currentAnime.images?.webp?.large_image_url;

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[70vh] mb-12 overflow-hidden group">
      {/* Background image with slide transition */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out ${
          nextIndex !== null ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      />

      {/* Next slide preview (slides in from right) */}
      {nextIndex !== null && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out translate-x-0 opacity-100"
          style={{
            backgroundImage: `url('${
              animes[nextIndex]?.images?.jpg?.large_image_url ||
              animes[nextIndex]?.images?.jpg?.image_url ||
              animes[nextIndex]?.images?.webp?.large_image_url
            }')`,
          }}
        />
      )}

      {/* Gradient overlays for smooth fade to background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-neutral-950/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="max-w-2xl space-y-4">
            {/* Rank badge */}
            <div className="flex items-center gap-4">
              <div className="text-7xl font-bold text-white/20 leading-none">
                #{currentIndex + 1}
              </div>
              {currentAnime.score && (
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-2xl">★</span>
                  <span className="text-2xl font-bold">{currentAnime.score}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="text-5xl md:text-6xl font-bold text-white drop-shadow-2xl line-clamp-3">
              {currentAnime.title}
            </h2>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-300">
              {currentAnime.year && <span>{currentAnime.year}</span>}
              {currentAnime.type && <span>• {currentAnime.type}</span>}
              {currentAnime.episodes && <span>• {currentAnime.episodes} episodes</span>}
            </div>

            {/* Synopsis */}
            <p className="text-lg text-gray-200 line-clamp-3 max-w-2xl leading-relaxed">
              {currentAnime.synopsis}
            </p>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 pt-2">
              {currentAnime.genres?.slice(0, 3).map((genre) => (
                <span
                  key={genre.mal_id}
                  className="px-3 py-1 rounded-full bg-cyan-600/30 text-cyan-300 text-sm font-medium border border-cyan-500/30"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* More Info Button */}
            <div className="pt-4">
              <button
                onClick={() => navigate(`/anime/${currentAnime.mal_id}`)}
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={() => {
          setNextIndex((prev) => (prev === null ? (currentIndex - 1 + animes.length) % animes.length : (prev - 1 + animes.length) % animes.length));
          setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + animes.length) % animes.length);
            setNextIndex(null);
          }, 500);
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => {
          setNextIndex((prev) => (prev === null ? (currentIndex + 1) % animes.length : (prev + 1) % animes.length));
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % animes.length);
            setNextIndex(null);
          }, 500);
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {animes.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setNextIndex(index);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setNextIndex(null);
                }, 500);
              }
            }}
            className={`transition-all ${
              index === currentIndex
                ? 'bg-white w-8 h-2'
                : 'bg-gray-500 hover:bg-gray-400 w-2 h-2'
            } rounded-full`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
