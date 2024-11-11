import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import DepartmentDashboard from './layouts/DepartmentDashboard';
import ShareTicketForm from './pages/departmentDashboard/ShareTicketForm';
import TicketDetails from './pages/departmentDashboard/ticketDetails';
import CreateTicket from './pages/departmentDashboard/createTicket';

function App() {
  const router = createBrowserRouter([
    {
      path: "/departmentDashboard",
      element: <DepartmentDashboard />,
    },

    {
      path: "/shareticketForm",
      element: <ShareTicketForm/>,
    },


    {
      path: "/createTicket",
      element: <CreateTicket/>
  
    },

    {
      path: "/ticketDetails",
      element: <TicketDetails/>,
    },




  ]);


  return <RouterProvider router={router} />
}

export default App
