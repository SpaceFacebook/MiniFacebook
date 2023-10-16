// customRouter.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export const requireAuth = (Page) => {
  return (props) => {
    const router = useRouter();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
      // Vérifiez si le code s'exécute du côté client avant d'utiliser next/router
      if (typeof window !== 'undefined' && !isLoggedIn) {
        // Vérifiez si l'utilisateur accède à la page de connexion
        if (router.pathname !== '/login') {
          // Redirigez l'utilisateur vers la page de connexion s'il n'est pas authentifié
          router.push('/login');
        }
      }
    }, [isLoggedIn]);

    return <Page {...props} />;
  };
};
