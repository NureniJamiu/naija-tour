import { configureStore } from '@reduxjs/toolkit';
import userFavoritesReducer from './userFavoritesSlice';
import userPreferencesReducer from './userPreferencesSlice';
// import tripsReducer from './tripsSlice';

const store = configureStore({
  reducer: {
    userPreferences: userPreferencesReducer,
    userFavorites: userFavoritesReducer,
    // trips: tripsReducer,
  },
});

export default store;
