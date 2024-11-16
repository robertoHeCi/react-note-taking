import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient();


if (import.meta.env.VITE_ENV === 'development') {
  const { browserServer } = await import('./tests/mocks/browser/browser.ts');
  console.log("Starting MSW worker");
  browserServer.start();
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
)
