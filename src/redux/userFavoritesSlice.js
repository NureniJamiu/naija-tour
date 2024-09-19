import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
  }

const userFavoritesSlice = createSlice({
  name: 'userFavorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
        state.favorites = action.payload;
    },
  },
});

export const { setFavorites } = userFavoritesSlice.actions;
export default userFavoritesSlice.reducer;
