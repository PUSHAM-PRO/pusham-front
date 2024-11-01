// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Notification from './pages/Notification';
import React, { useState } from 'react';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Notification />
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
