import React from 'react'
import Login from "../components/Login";
import Feed from "../components/Feed";
import { useSelector } from "react-redux"; 
import Header from '../components/Header';
import { requireAuth } from "../auth/customRouter";
import Home from '../components/Home';
const home = () => {
  return (
    <div>
       <Home/>
         
    </div>
    
  )
}

export default home;