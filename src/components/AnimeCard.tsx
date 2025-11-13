import { Link } from 'react-router-dom';
import type { Anime } from '../types/anime';
import { BackgroundGradient } from './ui/background-gradient';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  const imageUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || '';
  const title = anime.title || 'Untitled';
  const score = anime.score ? `⭐ ${anime.score.toFixed(1)}` : null;
  const episodes = anime.episodes ? `${anime.episodes} eps` : null;
  const year = anime.year || anime.aired?.prop?.from?.year;

  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="block group h-full"
    >
      <BackgroundGradient
        containerClassName="rounded-2xl"
        className="rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-md shadow-xl h-full"
        animate
      >
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x400?text=No+Image';
            }}
          />
          {score && (
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white font-semibold">
              {score}
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col">
          <h3 className="font-semibold text-base mb-2 line-clamp-2 text-neutral-100 group-hover:text-cyan-300 transition-colors min-h-[44px]">
            {title}
          </h3>
          <div className="mt-auto flex items-center gap-3 text-sm text-neutral-400">
            {year && <span>{year}</span>}
            {episodes && <span>•</span>}
            {episodes && <span>{episodes}</span>}
          </div>
        </div>
      </BackgroundGradient>
    </Link>
  );
};

export default AnimeCard;

