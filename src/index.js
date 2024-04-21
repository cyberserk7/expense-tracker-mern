import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddIncomePage from './pages/AddIncomePage';
import AddExpensePage from './pages/AddExpensePage';
import ErrorPage from './pages/ErrorPage';
import TransactionsPage from './pages/TransactionsPage';
import { Toaster } from 'sonner';

const router = createBrowserRouter([{
  path: "/",
  element: <HomePage />,
  errorElement: <ErrorPage />
},
{
  path: "/add-income",
  element: <AddIncomePage />
},
{
  path: "/add-expense",
  element: <AddExpensePage />
},
{
  path: "transactions",
  element: <TransactionsPage />
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);

