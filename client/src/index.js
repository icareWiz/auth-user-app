import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {css, Global} from "@emotion/react";
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from "react-cookie";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
        <App/>
        <Global styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

          *, ::after, ::before {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: Poppins, sans-serif;
          }
          :root {
            font-size: 10px;
          }
          a {
            text-decoration: none;
          }
          body {
            background-color: #EDF0F6;
          }
        `}
        />
    </CookiesProvider>
);

reportWebVitals();
