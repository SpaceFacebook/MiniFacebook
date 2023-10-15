import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import Feed from "../components/Feed";
import { useSelector } from "react-redux";
import { requireAuth } from "../auth/customRouter";
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

/*export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}*/