import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/authPage/LoginPage';
import HomePage from './pages/homepagex/HomePage';
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
import DepartmentDashboard from './layouts/DepartmentDashboard';
import CreatingTicket from './pages/departmentdashboardx/CreatingTicket';
import ShareTicketForm from './pages/departmentdashboardx/ShareTicketForm';
import TicketDetails from './pages/departmentdashboardx/ticketDetails';


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
      element: <CustomerSignUp />,
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
      path: '/eneo-accounts',
      element: <ENEOAccountManagement />,
    },
    {
      path: '/create-eneo-account',
      element: <CreateENEOAccountForm />,
    },
    {
      path: '/edit-eneo-account/:id',
      element: <EditENEOAccountForm />,
    },
    {
      path: "/eneo",
      element: <EneoDepartmentManagement />,
    },
    {
      path: "/ticketcreation",
      element: <TicketCreation />,
    },
    {
      path: "/status-tracking",
      element: <StatusTracking />,
    },
    {
      path: "/edit",
      element: <EditTicket />,
    },
    {
      path: "/tender",
      element: <TenderSubmissionForm />
    },
    {
      path: "/departmentdashboard",
      element: <DepartmentDashboard />,
    },
    {
      path: "/create-ticket",
      element: <CreatingTicket />,
    },
    {
      path: "/edit",
      element: <EditTicket />,
    },
    {
      path: "/share-ticket",
      element: <ShareTicketForm />,
    },
    {
      path: "/ticket-details",
      element: <TicketDetails />,
    },
  
  ]);

  return <RouterProvider router={router} />;
}

export default App;
