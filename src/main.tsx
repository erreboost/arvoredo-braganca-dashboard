import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {VisibleExtentProvider} from './utils/VisibleExtentContext';
import {TreeProvider} from './utils/TreeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TreeProvider>
      <VisibleExtentProvider>
        <App />
      </VisibleExtentProvider>
    </TreeProvider>
  </React.StrictMode>
);
