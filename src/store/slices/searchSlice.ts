import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { searchAnime } from '../../services/api';
import type { Anime, Pagination, SearchFilters } from '../../types/anime';

interface SearchState {
  query: string;
  results: Anime[];
  pagination: Pagination | null;
  currentPage: number;
  loading: boolean;
  error: string | null;
  filters: SearchFilters;
}

const initialState: SearchState = {
  query: '',
  results: [],
  pagination: null,
  currentPage: 1,
  loading: false,
  error: null,
  filters: {
    sfw: true,
    orderBy: 'score',
    sort: 'desc',
  },
};

export const fetchAnimeSearch = createAsyncThunk(
  'search/fetchAnimeSearch',
  async ({
    query,
    page,
    filters,
  }: {
    query: string;
    page: number;
    filters?: SearchFilters;
  }) => {
    const response = await searchAnime(query, page, undefined, filters);
    return response;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.currentPage = 1;
      state.results = [];
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
      state.results = [];
      state.error = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.pagination = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchAnimeSearch.rejected, (state, action) => {
        // Ignore cancelled requests (they're expected when user continues typing)
        if (action.error.message === 'Request cancelled') {
          return;
        }
        state.loading = false;
        state.error = action.error.message || 'Failed to search anime';
        state.results = [];
        state.pagination = null;
      });
  },
});

export const { setQuery, setPage, clearResults, setFilters } = searchSlice.actions;
export default searchSlice.reducer;

