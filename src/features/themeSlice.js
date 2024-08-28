import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme1: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme1 = !state.theme1;
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
