import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route ,Outlet} from "react-router-dom";
import {  toast } from 'react-toastify';

const ProtectedRoute = ({ isAdmin,element }) => {

  const { isAuthenticated,user} = useSelector(
    (state) => state.user
    );
    
    const Navigate = useNavigate();
    
    
            if (isAuthenticated === false) {
              toast.error("please login first");
              return <Navigate to="/login" />;
            }

            if ( user.role !== "admin") {
              toast.error('Only admin can acces')
              return <Navigate to="/" />;
            }
            
            <Outlet/>
            return element

          
  
}

export default ProtectedRoute;