import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTopAnime } from '../../services/api';
import type { Anime } from '../../types/anime';

export interface HeroCarouselState {
  animes: Anime[];
  loading: boolean;
  error: string | null;
}

const initialState: HeroCarouselState = {
  animes: [],
  loading: false,
  error: null,
};

export const fetchTopAnime = createAsyncThunk(
  'heroCarousel/fetchTopAnime',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTopAnime();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch top anime'
      );
    }
  }
);

const heroCarouselSlice = createSlice({
  name: 'heroCarousel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.animes = action.payload;
      })
      .addCase(fetchTopAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default heroCarouselSlice.reducer;
