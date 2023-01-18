/**
 * @module index.js
 * @description Entry point for application; hangs React app off of #root in index.html.
 */
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);





