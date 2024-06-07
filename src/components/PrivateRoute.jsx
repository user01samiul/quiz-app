import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function PrivateRoute({children}) {
  
  const { currentUser } = useAuth();

  if (currentUser){
    return children
  }
  else{
    return <Navigate to="/login" />
  }
}

// children = <Component/>
//*** won't put {children}, just put children