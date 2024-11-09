import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/authPage/LoginPage'
import HomePage from './pages/HomePage/HomePage';
import EneoSignUp from './pages/SignUps/EneoSignUp';
import Notification from './pages/Notification';
import CustomerFacing from './pages/customerpage/CustomerFacing';
import StatusTracking from './pages/customerpage/StatusTracking';
import EditTicket from './pages/customerpage/EditTicket';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/login",
    element: <LoginPage />
    },
    {
      path: "/eno",
      element: <EneoSignUp />
    },
    {
      path: "/notification",
      element: <Notification />
    },
    {
      path: "/dashboard",
      element: <CustomerFacing />,
    },
    {
      path: "/status-tracking",
      element: <StatusTracking />
    },
    {
      path: "/edit",
      element: <EditTicket />
    },
  ]);

  return <RouterProvider router={router} />;





}


export default App;

