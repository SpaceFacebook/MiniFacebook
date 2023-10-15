import React from 'react'
import Login from "../components/Login";
import Feed from "../components/Feed";
import { useSelector } from "react-redux"; 
import Header from '../components/Header';
import { requireAuth } from "../auth/customRouter";
import Home from '.';
const home = () => {
    //const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
{/*       
        <title>MiniFacebook </title>
        
        {isLoggedIn ? <div><Header/>

        <main className="flex bg-gray-100">
         
         <Feed/>
        </main> 
        </div>
        : <Login />
      }
       */}
       <Home/>
         
    </div>
    
  )
}

export default home;