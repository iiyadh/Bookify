import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Home from './Component/Home.jsx';
import Inbox from './Component/Inbox.jsx';
import Services from './Component/Service.jsx';
import Calendar from './Component/Calender.jsx';
import Users from './Component/Users.jsx';
import UserPage from './Pages/UserPage.jsx';
import MakeAppoitement from './Component/MakeAppoitement.jsx';
import AppointmentHistory from './Component/AppointmentHistory.jsx';
import TermsofService from './Pages/TermsofService.jsx';
import PrivacyPolicy from './Pages/PrivacyPolicy.jsx';
import ForgetPassword from './Pages/ForgetPassword.jsx';
import ResetPassword from './Pages/ResetPassword.jsx';
import Statics from './Component/Statics.jsx';
import LandingPage from './Pages/LandingPage.jsx';
import { createRoot } from 'react-dom/client';
import AuthProvider from './Context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import  RequireAuth  from './Protection/RequireAuth.jsx';
import RequireRole from './Protection/RequireRole.jsx';
import NotFound from './Pages/Notfound.jsx';
import InactiveUser from './Pages/InactiveUser.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';


const router = createBrowserRouter([
  { path: "/", element: <LandingPage />},
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "dashboard", element: <RequireAuth><RequireRole allowedRoles={['admin']}><Dashboard/></RequireRole></RequireAuth> , children:[
    { index: true , element : <Home />},
    { path: "inbox", element: <Inbox />},
    { path: "services", element: <Services />},
    { path: "calendar", element: <Calendar />},
    { path: "users", element: <Users />},
    { path: "statics", element: <Statics />}
  ]},
  { path: "user", element: <RequireAuth><UserPage/></RequireAuth> , children: [
    { index: true , element : <Navigate to = "makeappoitement" />},
    { path: 'makeappoitement' , element : <MakeAppoitement />},
    { path: 'history' , element : <AppointmentHistory />},
  ]},
  { path: "*", element: <NotFound /> },
  { path : "inactive-user" , element : <InactiveUser />},
  { path : "terms-of-service" , element : <TermsofService />},
  { path : "privacy-policy" , element : <PrivacyPolicy />},
  { path : "forgot-password" , element : <ForgetPassword />},
  { path : "reset-password/:token" , element : <ResetPassword />},
]);

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </AuthProvider>
  </GoogleOAuthProvider>
)
