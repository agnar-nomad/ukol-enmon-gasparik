import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EnmonAppProvider } from './AppContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <EnmonAppProvider>
      <App />
    </EnmonAppProvider>
  </React.StrictMode>
);
