import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import Feed from "../components/Feed";
import { useSelector } from "react-redux";
export default function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  return (
    <div>

     <Head>
        <title>MiniFacebook </title>
        </Head>
        {isLoggedIn ? <div><Header/>

        <main className="flex bg-gray-100">
         
         <Feed/>
        </main> 
        </div>
        : <Login />
      }
         
    </div>
  )
}
/*export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}*/