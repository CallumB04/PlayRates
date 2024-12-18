import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/fonts.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
