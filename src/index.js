import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgetPassword } from './pages/ForgetPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Home } from './pages/Home';
import { Toaster } from 'react-hot-toast';
import SelectPlan from './pages/SelectPlan';
import MpesaPay from './pages/MpesaPay';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/plans",
    element: <SelectPlan />
  },
  {
    path: "/payment",
    element: <MpesaPay />
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
