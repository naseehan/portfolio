import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReactGA from 'react-ga4';
import { BrowserRouter } from 'react-router-dom';

ReactGA.initialize('G-SRX5M4NWJB'); // Replace with your Measurement ID
ReactGA.send("pageview");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
