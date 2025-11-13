import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAnimeById } from '../../services/api';
import type { Anime } from '../../types/anime';

interface AnimeDetailState {
  anime: Anime | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnimeDetailState = {
  anime: null,
  loading: false,
  error: null,
};

export const fetchAnimeDetail = createAsyncThunk(
  'animeDetail/fetchAnimeDetail',
  async (id: number) => {
    const response = await getAnimeById(id);
    return response.data;
  }
);

const animeDetailSlice = createSlice({
  name: 'animeDetail',
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.anime = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.anime = action.payload;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch anime details';
        state.anime = null;
      });
  },
});

export const { clearDetail } = animeDetailSlice.actions;
export default animeDetailSlice.reducer;

