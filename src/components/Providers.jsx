"use client";

import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "../store/store";
import { setTheme } from "../features/themeSlice";

const ThemeSync = ({ children }) => {
  const dispatch = useDispatch();
  const { theme1 } = useSelector((state) => state.theme);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
      const isLight = saved ? saved === "light" : prefersLight;
      if (isLight) {
        dispatch(setTheme(true));
      }
    } catch {
      // Storage access fallback
    }
  }, [dispatch]);

  useEffect(() => {
    const themeName = theme1 ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", themeName);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeName);
  }, [theme1]);

  return <>{children}</>;
};

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeSync>{children}</ThemeSync>
    </Provider>
  );
}
