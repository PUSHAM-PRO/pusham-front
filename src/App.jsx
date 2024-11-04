
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import SideBar from './components/SideBar';
import CustomerFacing from './pages/customerpage/CustomerFacing';



function App() {
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <CustomerFacing />,
    },
    {
      path: "/sidebar",
      element: <SideBar />,
    },
  ]
  );

  return <RouterProvider router={router} />;
};

export default App;
