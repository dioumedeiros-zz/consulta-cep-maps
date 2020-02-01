import { createGlobalStyle } from "styled-components";

// import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline: 0;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased !important;
  }
  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }
  button {
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  .lg-toast.lg-error-toast-theme {
    background: #fff;
  }
`;
