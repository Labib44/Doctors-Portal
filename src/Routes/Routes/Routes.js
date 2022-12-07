import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../../Layout/DashBoardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../pages/DashBoard/AddDoctor/AddDoctor";
import AllUsers from "../../pages/DashBoard/AllUsers/AllUsers";
import DashBoard from "../../pages/DashBoard/DashBoard/DashBoard";
import ManageDoctors from "../../pages/DashBoard/ManageDoctors/ManageDoctors";
import MyAppointment from "../../pages/DashBoard/MyAppointment/MyAppointment";
import Payment from "../../pages/DashBoard/Payment/Payment";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>,
        errorElement:<DisplayError></DisplayError>,
        children: [
            { path: '/', element: <Home></Home> },
            { path: '/appointment', element: <Appointment></Appointment> },
            { path: '/login', element: <Login></Login> },
            { path: '/signup', element: <SignUp></SignUp> },

        ]
    },
    {
        path: '/dashboard', element: <PrivateRoute> <DashBoardLayout></DashBoardLayout></PrivateRoute>,
        errorElement:<DisplayError></DisplayError>,
        children: [
            { path: '/dashboard', element: <MyAppointment></MyAppointment> },
            { path: '/dashboard/allusers', element:<AdminRoute><AllUsers></AllUsers></AdminRoute>},
            { path: '/dashboard/adddoctor', element:<AdminRoute><AddDoctor></AddDoctor></AdminRoute>},
            { path: '/dashboard/managedoctors', element:<AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>},

            { path: '/dashboard/payment/:id', element:<Payment></Payment>,
            loader: ({params})=> fetch(`https://doctors-portal-server-ten-vert.vercel.app/bookings/${params.id}`)
        },
        ]
    }
])

export default router;