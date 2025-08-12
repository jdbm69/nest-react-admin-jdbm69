// Actualización a React 18:
// - Se reemplaza ReactDOM.render por ReactDOM.createRoot y root.render para aprovechar
//   el nuevo API concurrente de React 18.
// - Se actualiza la importación de react-query a '@tanstack/react-query' (última versión).
// - Se mantiene la envoltura con AuthenticationProvider y QueryClientProvider sin cambios.
// - Se asegura la no nulidad del elemento raíz con el operador ! en getElementById.

import './styles/index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AuthenticationProvider } from './context/AuthenticationContext';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
);

reportWebVitals();
