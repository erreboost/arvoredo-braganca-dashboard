import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {VisibleExtentProvider} from './utils/VisibleExtentContext';
// import dotenv from "dotenv";

// dotenv.config();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VisibleExtentProvider>
      <App />
    </VisibleExtentProvider>
  </React.StrictMode>
);
