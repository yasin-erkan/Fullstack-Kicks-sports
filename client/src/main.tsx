import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {ToastContainer} from 'react-toastify';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

// required imports for react query
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// create react query client
const queryClient = new QueryClient();

// create react query provider
// will be used throughout the application
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
    <ToastContainer />
  </QueryClientProvider>,
);
