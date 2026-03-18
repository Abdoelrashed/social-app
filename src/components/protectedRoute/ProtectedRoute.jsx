import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from './../Login/Login';


export default function protectedRoute({children}) {
 
 if (localStorage.getItem("userToken")){
   return <>{children}</>
 }
 else{
  return <Navigate to="/login" />
 }
 
}
