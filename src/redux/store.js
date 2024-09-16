import { configureStore } from '@reduxjs/toolkit';
import userPreferencesReducer from './userPreferencesSlice';
// import userPreferencesReducer from './userPreferencesSlice';
// import tripsReducer from './tripsSlice';

const store = configureStore({
  reducer: {
    userPreferences: userPreferencesReducer,
    // trips: tripsReducer,
  },
});

export default store;
