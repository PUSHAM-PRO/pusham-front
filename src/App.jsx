import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/authPage/LoginPage';
import HomePage from './pages/homepagex/HomePage';
import Notifications from './pages/Notifications';
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
import SuperDashboard from './layouts/SuperDashboard';
import SuperTacking from './pages/superadmin/SuperTacking';
import AddTicket from './pages/superadmin/AddTicket';
import DeptLogin from './pages/superadmin/DeptSignin';
import DepartmentSignUp from './pages/superadmin/CreateDaptForm';
import CreateDepartmentForm from './pages/superadmin/CreateDeptForm';
import DepartmentDashboard from './layouts/DepartmentDashboard';
import CreatingTicket from './pages/departmentdashboardx/CreatingTicket';
import ShareTicketForm from './pages/departmentdashboardx/ShareTicketForm';
import AdminTicketDetails from './pages/superadmin/SinglePage';
import TicketDetails from './pages/departmentdashboardx/ticketDetails';
import AgentDashboard from './layouts/AgentDashboard';
import AgTickets from './pages/agent/AgTickets';
import AgentCreateTicket from './pages/agent/AgentCreateTicket';
import AgentTicketDetails from './pages/agent/AgentTicketDetails';
import EscalateModal from './components/modals/EscalateModal';
import CustomerTracking from './pages/superadmin/CustomerTracking';
import CreateNotification from './pages/superadmin/CreateNotification';
import CustomerTicketDetails from './pages/customerpage/CustomerTicketDetails';


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
      path: '/agent-signup',
      element: <AgentSignUp />,
    },
    {
      path: '/customer',
      element: <CustomerSignUp />,
    },
    {
      path: '/notifications',
      element: <Notifications />,
    },
    {
      path: '/create-notification',
      element: <CreateNotification />,
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
      path: "/custtickdetails",
      element: <CustomerTicketDetails />,
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
      path: "/deptLogin",
      element: <DeptLogin />
    },
    {
      path: "/deptSignin",
      element: <DepartmentSignUp/>
    },
    {
      path: "/createDepartment",
      element: <CreateDepartmentForm/>
    },

    {
      path:"/superAdmin",
      element:<SuperDashboard/>,
      children:[
     
      {
        index: true,
        element: <SuperTacking/>
      },
      {
        path: "superCreate",
        element: <AddTicket />
      },
      {
        path: "tickets/:id", 
        element: <AdminTicketDetails />
      },
       {
        path: "customerTrack", 
        element: <CustomerTracking />
      }
     

      ]
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
      path: "/edit-ticket/:id",
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

    {
      path: "/agent",
      element: <AgentDashboard />,
      children: [
        {
          index: true,
          element: <AgTickets />
        },
        {
          path: "ticket-details/:id",
          element: <AgentTicketDetails />
        }
      ]
    },
    {
      path: "/agentcreateticket",
      element: <AgentCreateTicket />
    },
    
    
  
  ]);

  return <RouterProvider router={router} />;
}

export default App;
