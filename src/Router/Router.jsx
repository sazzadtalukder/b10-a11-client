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
import AddVolunteerNeedPost from '../Pages/AddVolunteerNeedPost/AddVolunteerNeedPost';
import PrivateRouter from './PrivateRouter';
import ViewDetails from '../Pages/ViewDetails/ViewDetails';
import BeAVolunteer from '../Pages/BeAVolunteer/BeAVolunteer';
import ManageMyPosts from '../Pages/ManageMyPosts/ManageMyPosts';
import UpdatePost from '../Pages/UpdatePost/UpdatePost';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
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
            element: <PrivateRouter><MyProfile></MyProfile></PrivateRouter>
        },{
            path: '/allVolunteerNeedPosts',
            element: <AllVolunteerNeedPosts></AllVolunteerNeedPosts>
        },
        {
            path: '/addVolunteerNeedPost',
            element: <PrivateRouter><AddVolunteerNeedPost></AddVolunteerNeedPost></PrivateRouter>
        },{
            path: '/allVolunteer/:id',
            element: <PrivateRouter><ViewDetails></ViewDetails></PrivateRouter>,
            loader: ({params})=>fetch(`https://b10-a11-server-six.vercel.app/allVolunteer/${params.id}`)
        },
        {
                path: '/beAVolunteer/:id',
                element: <PrivateRouter><BeAVolunteer></BeAVolunteer></PrivateRouter>,
                loader: ({params})=>fetch(`https://b10-a11-server-six.vercel.app/allVolunteer/${params.id}`)
            },{
                path: '/manageMyPosts',
                element: <PrivateRouter><ManageMyPosts></ManageMyPosts></PrivateRouter>
            },{
                path: '/updatePost/:id',
                element: <PrivateRouter><UpdatePost></UpdatePost></PrivateRouter>,
                loader: ({params})=> fetch(`https://b10-a11-server-six.vercel.app/allVolunteer/${params.id}`)
            }
        
      ]
    },
  ]);

export default router;