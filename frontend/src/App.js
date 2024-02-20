import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Login from "./login";
import Naol from './adminDashbord';
import SetAcount from './setacount';
import Edit from './edituser';
import AdminAdduser from './AdminAdduser';
import UserDashboard from './userDashboard';
import UserUpdateProfile from './userUpdateProfile';
import ProfileOfAdmin from './profileOfAdmin';
import ForgetPass from './forgetPass';
import Verificationpage3 from './verificationpage3';
import Changepassword from './changepassword';

const access = localStorage.getItem('access')
const userRole = localStorage.getItem('userRole')

const router = createBrowserRouter([

  {
    path: "",
    element: <Login />,
  },

  {
    path: "/Admin Dashbord",
    element: access && userRole==='Admin'? <Naol />: <login/>,
  },
  {
    path: "/adduser",
    element: access && userRole==='Admin'? <AdminAdduser /> : <login/>,
  },
  {
    path: "/setaccount",
    element: access && userRole==='normal_users'?<SetAcount />:<login/>,
  },
  {
    path: "/edituser/:userId",
    element: access && userRole==='Admin'? <Edit />: <login/>,
  },
  {
    path: "/userpro",
    element: access && userRole==='normal_users'? <UserDashboard />: <login /> ,
  },
  {
    path: "/updatepro",
    element: access && userRole==='normal_users'? <UserUpdateProfile />: <login />,
  },
  
  {
    path: "/adminpro",
    element: access && userRole==='Admin'? <ProfileOfAdmin />: <login/> ,
  },
  {
    path: "/forget",
    element: <ForgetPass />,
  },
  {
    path: "/changepassword/:userId/:token",
    element: <Changepassword  />,
  },
  {
    path: "/v3",
    element: <Verificationpage3  />,
  },
  
  
]);
function App() {
  return (


      <>

    <RouterProvider router={router} />

       
      </>
        
   
  );
}

export default App;
