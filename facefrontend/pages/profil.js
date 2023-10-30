import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import Profile from "../components/Profile";
import Header from "../components/Header";
import { useRouter } from 'next/router';
const Profil = () => {
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
      {loggedIn ? <div><Header/>

<Profile/></div> : null}
    </div>
  );
};
  

export default Profil;