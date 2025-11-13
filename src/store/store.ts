import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import animeDetailReducer from './slices/animeDetailSlice';
import heroCarouselReducer from './slices/heroCarouselSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    animeDetail: animeDetailReducer,
    heroCarousel: heroCarouselReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

