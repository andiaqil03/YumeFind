import type { AnimeSearchResponse, AnimeDetailResponse, SearchFilters } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

// AbortController for canceling requests
let searchAbortController: AbortController | null = null;

export const searchAnime = async (
  query: string,
  page: number = 1,
  signal?: AbortSignal,
  filters?: SearchFilters
): Promise<AnimeSearchResponse> => {
  // Cancel previous request if it exists
  if (searchAbortController) {
    searchAbortController.abort();
  }

  // Create new AbortController for this request
  searchAbortController = new AbortController();

  // Use provided signal or create new one
  const abortSignal = signal || searchAbortController.signal;

  try {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('page', String(page));
    params.set('limit', '20');

    // Map filters to Jikan params
    if (filters) {
      if (filters.type) params.set('type', filters.type);
      if (filters.status) params.set('status', filters.status);
      if (filters.rating) params.set('rating', filters.rating);
      if (filters.sfw) params.set('sfw', 'true');

      if (filters.genres && filters.genres.length > 0) {
        params.set('genres', filters.genres.join(','));
      }
      if (filters.genresExclude && filters.genresExclude.length > 0) {
        params.set('genres_exclude', filters.genresExclude.join(','));
      }

      if (typeof filters.minScore === 'number') {
        params.set('min_score', String(filters.minScore));
      }
      if (typeof filters.maxScore === 'number') {
        params.set('max_score', String(filters.maxScore));
      }

      // Map year to full-year date range
      if (typeof filters.year === 'number') {
        params.set('start_date', `${filters.year}-01-01`);
        params.set('end_date', `${filters.year}-12-31`);
      }

      if (filters.orderBy) params.set('order_by', filters.orderBy);
      if (filters.sort) params.set('sort', filters.sort);
    }

    const response = await fetch(
      `${BASE_URL}/anime?${params.toString()}`,
      {
        signal: abortSignal,
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`Failed to fetch anime: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // Handle abort errors silently (they're expected when user continues typing)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request cancelled');
    }
    throw error;
  }
};

export const getAnimeById = async (id: number): Promise<AnimeDetailResponse> => {
  const response = await fetch(`${BASE_URL}/anime/${id}/full`);

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (response.status === 404) {
      throw new Error('Anime not found.');
    }
    throw new Error(`Failed to fetch anime details: ${response.statusText}`);
  }

  return response.json();
};

export const getTopAnime = async (): Promise<AnimeSearchResponse> => {
  const response = await fetch(`${BASE_URL}/top/anime?limit=10&filter=bypopularity`);

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    throw new Error(`Failed to fetch top anime: ${response.statusText}`);
  }

  return response.json();
};

