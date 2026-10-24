import { createSlice } from "@reduxjs/toolkit";

const applyThemeToDOM = (isLight) => {
  if (typeof document !== "undefined") {
    const themeName = isLight ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", themeName);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeName);
  }
};

const initialState = {
  // Always initialize to dark (false) so server SSR and initial client hydration match 100%
  theme1: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme1 = !state.theme1;
      const nextThemeName = state.theme1 ? "light" : "dark";
      applyThemeToDOM(state.theme1);
      try {
        window.localStorage.setItem("portfolio-theme", nextThemeName);
      } catch {
        // Storage fallback
      }
    },
    setTheme: (state, action) => {
      state.theme1 = Boolean(action.payload);
      const nextThemeName = state.theme1 ? "light" : "dark";
      applyThemeToDOM(state.theme1);
      try {
        window.localStorage.setItem("portfolio-theme", nextThemeName);
      } catch {
        // Storage fallback
      }
    }
  },
});

export default themeSlice.reducer;
export const { changeTheme, setTheme } = themeSlice.actions;
