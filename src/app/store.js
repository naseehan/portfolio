import { configureStore } from "@reduxjs/toolkit";
import themeSlice, { changeTheme } from "../features/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});
