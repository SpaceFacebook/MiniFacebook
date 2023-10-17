import React from 'react'
import { requireAuth } from '../auth/customRouter';
import Header from './Header';
import Feed from './Feed';
import Head from 'next/head';
function Home() {
    //const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    
    return (
      <div>
  
       <Head>
          <title>MiniFacebook </title>
          </Head>
          <div><Header/>
  
          <main className="flex bg-gray-100">
           
           <Feed/>
          </main> 
          </div>
           
      </div>
    )
  }
  export default requireAuth(Home);
