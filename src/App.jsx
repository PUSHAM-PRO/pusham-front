import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import DepartmentDashboard from './layouts/DepartmentDashboard';
import ShareTicketForm from './pages/departmentDashboard/ShareTicketForm';
import TicketCreation from './pages/departmentDashboard/ticketCreation';
import TicketDetails from './pages/departmentDashboard/ticketDetails';

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
      path: "/ticketCreation",
      element: <TicketCreation/>,
    },

    {
      path: "/ticketDetails",
      element: <TicketDetails/>,
    },




  ]);


  return <RouterProvider router={router} />
}

export default App
