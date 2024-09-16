import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activityTypes: [],
    attractionTypes: [],
    regionTypes: [],
  }

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setAttractionTypes: (state, action) => {
        state.attractionTypes = action.payload;
    },

    setActivityTypes: (state, action) => {
        state.activityTypes = action.payload;
    },

    setRegionTypes: (state, action) => {
        state.regionTypes = action.payload;
    },
        // Remember to remove this setPreferences function
    setPreferences: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setAttractionTypes, setActivityTypes, setRegionTypes, setPreferences } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
