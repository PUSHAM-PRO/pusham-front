
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import CustomerDashboard from './layouts/CustomerDashboard'


function App() {
  const router = createBrowserRouter([
        {
          path: "/dashboard",
          element: <CustomerDashboard />,
        }
      ]
  );

  return <RouterProvider router={router} />;
}

export default App;
