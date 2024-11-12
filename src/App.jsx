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
import DepartmentDashboard from './layouts/DepartmentDashboard';
import CreateTicket from './pages/departmentDashboard/createTicket';
import ShareTicketForm from './pages/departmentDashboard/ShareTicketForm';
import TicketDetails from './pages/departmentDashboard/ticketDetails';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect } from 'react';



// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxSlWotU1ly1O0zeyvEJK-oeBjA1m4is8",
  authDomain: "pushanotification.firebaseapp.com",
  projectId: "pushanotification",
  storageBucket: "pushanotification.firebasestorage.app",
  messagingSenderId: "752431191312",
  appId: "1:752431191312:web:dc2455b78896f3f9034195",
  measurementId: "G-TZWMT5CWHG"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);


function App() {
useEffect (() => {
  // Add the public key generated from the console here.
getToken(messaging, {vapidKey: "BCZ6z1ijhgwO5DZupmFHhQ7rpjzixz6mZbCdo478Fo_2a1jgo7AoxjQTTl9lWcSml9VPQ7uNOT9FkLIij52T84A"});
}, []);

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
    
    
    {
      path: "/departmentDashboard",
      element: <DepartmentDashboard/>,
    },

    {
      path: "/createTicket",
      element: <CreateTicket/>,
    },

    {
      path: "/edit",
      element: <EditTicket/>,
    },

    {
      path: "/shareTicketForm",
      element: <ShareTicketForm/>,
    },

    {
      path: "/ticketDetails",
      element: <TicketDetails/>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
