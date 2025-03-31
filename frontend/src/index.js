import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import UserProvider from './context/userContext.js'
import Logout from './components/Logout.jsx'
import AddProperty from './pages/AddProperty.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import AddUtilityBills from './pages/AddUtilityBills.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layout /></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {path: "register", element: <Register />},
      {path: "login", element: <Login />},
      {path: "logout", element: <Logout />},
      {path: "/add-property", element: <AddProperty />},
      {path: "/view-property/:id", element: <PropertyDetails />},
      {path: "/add-utility-bill", element: <AddUtilityBills />},
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
    {/* <App /> */}
  </StrictMode>,
)
