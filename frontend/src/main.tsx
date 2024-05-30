import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './core/app';
import ThemeProvider from './shared/utils/theme';

import QueryProvider from './shared/components/providers/react-query';
import ErrorBoundary from './shared/components/error/boundary';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <ErrorBoundary>
          <App />
          <Toaster />
        </ErrorBoundary>
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
