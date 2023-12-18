import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/App.css";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, } from 'react-router-dom';
import Login from "./components/pages/Login";
import Signup from './components/pages/Signup.jsx';
import Quiz from './components/pages/Quiz.jsx';
import Result from './components/pages/Result.jsx';

import PublicRoute from './components/PublicRoute.jsx';
import PrivateRoute from "./components/PrivateRoute.jsx"


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
          <Route  path="quiz" 
          element={<PrivateRoute>  <Quiz/>  </PrivateRoute>} 
          />
          <Route  path="result" 
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


