// import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";



export default function PublicRoute({children}) {

  const { currentUser } = useAuth();
  if (currentUser){
  return  <Navigate to="/quiz-app/" />
   } else{
    return children
   }
}

// children = <Component/>
//*** won't put {children}, just put children