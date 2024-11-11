import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/authPage/LoginPage';
import HomePage from './pages/homepage/HomePage';
import Notification from './pages/Notification';
import CustomerFacing from './pages/customerpage/CustomerFacing';
import ENEOAccountManagement from './pages/superadmin/EneoAccountManagement';
import CreateENEOAccountForm from './pages/superadmin/CreateAccountForm';
import EditENEOAccountForm from './pages/superadmin/EditAccountform';
import EneoDepartmentManagement from './pages/eneodepartment/EneoDepartmentManagement';
import AgentSignUp from './pages/signups/AgentSignUp';
import CustomerSignUp from './pages/signups/CustomerSignUp';
import TenderSubmissionForm from './pages/tendersub';

import TicketCreation from './pages/customerpage/TicketCreation';
import StatusTracking from './pages/customerpage/StatusTracking';
import EditTicket from './pages/customerpage/EditTicket';


function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/agent',
      element: <AgentSignUp />,
    },
    {
      path: '/customer',
      element: <CustomerSignUp/>,
    },
    {
      path: '/notification',
      element: <Notification />,
    },
    {
      path: '/dashboard',
      element: <CustomerFacing />,
    },
    {
      path: '/admin/eneo-accounts',
      element: <ENEOAccountManagement />,
    },
    {
      path: '/admin/create-eneo-account',
      element: <CreateENEOAccountForm />,
    },
    {
      path: '/admin/edit-eneo-account/:id',
      element: <EditENEOAccountForm />,
    },
    {
      path: "/admin/eneo",
      element: <EneoDepartmentManagement />,
    },
    {
      path: "/ticketcreation",
      element: <TicketCreation />,
    },
    {
      path: "/status-tracking",
      element: <StatusTracking/>,
    },
    {
      path: "/edit",
      element: <EditTicket/>,
    },
    {
      path: "/tender",
      element: <TenderSubmissionForm />
    },
    
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
