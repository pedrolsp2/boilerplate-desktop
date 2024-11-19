import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from './components/ui/sonner';

const CACHE_TIME = 60 * 5 * 1000;
const STALE_TIME = 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: CACHE_TIME,
      staleTime: STALE_TIME,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
    <ReactQueryDevtools />
  </QueryClientProvider>
);
