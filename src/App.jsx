
 import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/authPage/LoginPage'
import HomePage from './pages/HomePage/HomePage';
import EneoSignUp from './pages/SignUps/EneoSignUp';

function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />

  },
  {
    path: "/home",
    element: <HomePage />

  },

  {
    path: "/eno",
    element: <EneoSignUp/>

  },
])

  return <RouterProvider router={router} />;
    

    
    
  
}

export default App; 

