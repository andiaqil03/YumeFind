// Jikan API response types
export interface AnimeImage {
  image_url?: string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: AnimeImage;
    webp: AnimeImage;
  };
  trailer?: {
    url: string;
    embed_url: string;
  };
  title: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms?: string[];
  type?: string;
  source?: string;
  episodes?: number;
  status?: string;
  airing?: boolean;
  aired?: {
    from?: string;
    to?: string;
    prop?: {
      from?: { day?: number; month?: number; year?: number };
      to?: { day?: number; month?: number; year?: number };
    };
    string?: string;
  };
  duration?: string;
  rating?: string;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  synopsis?: string;
  background?: string;
  season?: string;
  year?: number;
  broadcast?: {
    day?: string;
    time?: string;
    timezone?: string;
    string?: string;
  };
  producers?: Array<{ mal_id: number; type: string; name: string; url: string }>;
  licensors?: Array<{ mal_id: number; type: string; name: string; url: string }>;
  studios?: Array<{ mal_id: number; type: string; name: string; url: string }>;
  genres?: Array<{ mal_id: number; type: string; name: string; url: string }>;
  explicit_genres?: Array<{ mal_id: number; type: string; name: string; url: string }>;
  themes?: Array<{ mal_id: number; type: string; name: string; url: string }>;
  demographics?: Array<{ mal_id: number; type: string; name: string; url: string }>;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface AnimeSearchResponse {
  data: Anime[];
  pagination: Pagination;
}

export interface AnimeDetailResponse {
  data: Anime;
}

// Filters for search endpoint (Jikan v4)
export interface SearchFilters {
  // Basic
  type?: 'tv' | 'movie' | 'ova' | 'ona' | 'special' | 'music';
  status?: 'airing' | 'complete' | 'upcoming';
  rating?: 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';
  sfw?: boolean;

  // Discovery
  genres?: number[]; // Jikan genre MAL IDs (comma-separated in query)
  genresExclude?: number[];

  // Scores
  minScore?: number; // 0-10
  maxScore?: number; // 0-10

  // Time range
  year?: number; // maps to start_date/end_date (full year range)

  // Sorting
  orderBy?:
    | 'mal_id'
    | 'title'
    | 'type'
    | 'rating'
    | 'start_date'
    | 'end_date'
    | 'episodes'
    | 'score'
    | 'scored_by'
    | 'rank'
    | 'popularity'
    | 'members'
    | 'favorites';
  sort?: 'asc' | 'desc';
}

