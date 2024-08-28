import React from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../features/themeSlice";

const Theme = styled.div`
 position: fixed;
    top: 14px;
    right: 14px;
    z-index: 10;
`;


const ThemeIcons = () => {
    const dispatch = useDispatch();
    const { theme1 } = useSelector((state) => state.theme);

  return (
    <Theme
    className="dark-mode-icons"
    onClick={() => dispatch(changeTheme())}
  >
    <i
      className={`fa-solid ${theme1 ? "fa-moon" : "fa-sun"}  fa-xl`}
      style={{ color: theme1 ? "#000000" : "#ffffff" }}
    ></i>
  </Theme>
  )
}

export default ThemeIcons
