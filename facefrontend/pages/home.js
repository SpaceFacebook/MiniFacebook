import React, { useEffect, useState } from 'react'
import Login from "../components/Login";
import Feed from "../components/Feed";
import { useSelector } from "react-redux"; 
import Header from '../components/Header';
import { requireAuth } from "../auth/customRouter";
import Home from '../components/Home';
import { useRouter } from 'next/router';
const home = () => {
  const [loggedIn,setLoggedIn]=useState(false);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  
  useEffect(() => {
    // Récupérez la variable `loggedIn` depuis le `localStorage`
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setLoggedIn(isLoggedIn);

    if (!isLoggedIn) {
      router.push('/login'); // Redirigez vers la page de connexion si l'utilisateur n'est pas authentifié
    }
  }, [router]);

  return (
    <div>
      {loggedIn ? <Home /> : null}
    </div>
  );
};

export default home;