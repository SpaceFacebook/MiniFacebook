import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import '../styles/enregistrer.css';
import store from "../public/src/app/store";
import { Provider } from "react-redux";
import { useEffect } from 'react';
import { setLoggedIn, setLoggedOut } from '../public/src/features/loginSlice';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      if (typeof window !== 'undefined') {
        const authToken = localStorage.getItem('authToken');
        return !!authToken;
      }
      return false;
    };

    const isAuthenticated = checkAuthentication();

    if (!isAuthenticated && router.pathname !== '/login') {
      // Redirigez l'utilisateur vers la page de connexion s'il n'est pas authentifié
      router.push('/login');
    }
  }, [router.pathname]);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
