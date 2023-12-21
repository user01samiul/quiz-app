import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Quiz from './components/pages/Quiz.jsx';
import Result from './components/pages/Result.jsx';
import Signup from './components/pages/Signup.jsx';
import "./styles/App.css";

import PrivateRoute from "./components/PrivateRoute.jsx";
import PublicRoute from './components/PublicRoute.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    {/* --------------------***Page with Layout***------------------ */}
    <Route path='/quiz-app' element={<Layout/>}>
          <Route  path="" 
          element={<Home/>} 
          />
          <Route  path="signup" 
          element={<PublicRoute> <Signup/> </PublicRoute>} 
          />
          <Route  path="login" 
          element={<PublicRoute>  <Login/>  </PublicRoute>} 
          />
          {/* now page must have something after 'quiz/' | received it from Videos.jsx - check it out */}
          <Route  path="quiz/:videoId"   
          element={<PrivateRoute>  <Quiz/>  </PrivateRoute>} 
          />
          <Route  path="result/:videoId" 
          element={<PrivateRoute>  <Result/>  </PrivateRoute>} 
          />
    </Route>
    </>
  ),
  {
      base: '/quiz-app' // Add the base property here else wont work
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />   //receives router props

)


