import {createSlice} from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {toggleDarkMode} = themeSlice.actions;
export default themeSlice.reducer;
