import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import Feed from "../components/Feed";
import { requireAuth } from "../auth/customRouter";
function PageLogin() {
  //const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  return (
    <div>

     <Login/>
         
    </div>
  )
}
export default PageLogin;