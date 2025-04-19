import React from 'react';
import {
    createBrowserRouter
  } from "react-router-dom";
import Root from '../LayOut/Root';
import Home from '../Pages/Home/Home';
import MyProfile from '../Pages/MyProfile/MyProfile';
import AllVolunteerNeedPosts from '../Pages/AllVolunteerNeedPosts/AllVolunteerNeedPosts';
import Login from '../Pages/LogIn/Login';
import Register from '../Pages/Register/Register';
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },{
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/myProfile',
            element: <MyProfile></MyProfile>
        },{
            path: 'allVolunteerNeedPosts',
            element: <AllVolunteerNeedPosts></AllVolunteerNeedPosts>
        }
      ]
    },
  ]);

export default router;