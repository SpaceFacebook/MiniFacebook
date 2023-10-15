import Image1 from "../images/camera.png";
import Image2 from '../images/chat.jpg';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import Information from "./Information";
import Posts from './Posts'
import CreatePost from "./CreatePost";
import Photos from "./Photos";
import { requireAuth } from "../auth/customRouter";
const Profile = () => {
  const currentUserEmail=useSelector((state)=>state.auth.email);
    return (
      <div className="bg-white w-[500px] h-[2873px] overflow-hidden text-left text-10xl text-black font-inter bg-{}">
        {/* <img
          className="absolute top-[145px] left-[0px] w-[1848px] h-[545px] object-cover"
          alt=""111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111§
          src={Image}
        /> */}
        <Image
        className="absolute top-[16px] left-[0px] w-full h-[400px] object-cover"
        src={Image1}/>
        <button className="absolute top-[360px] left-[1200px] w-[170px] h-[40px]  object-cover bg-gray-600 rounded-xl text-white">
        <FontAwesomeIcon icon={faCameraRetro}  className=" w-[25px] h-[25px] text-white "/>
        <strong>Edit cover photo</strong>
          </button>
        <div className="absolute top-[452px] left-[271px] text-[30px] tracking-[-0.02em] leading-[142.02%] font-medium opacity-[0.65]">
          Kaoutar EL
        </div>
        <div className="absolute top-[550px] left-[58px]   w-[1280px] border-b border-gray-500"></div>
        <div className="absolute top-[566px] left-[58px] tracking-[-0.02em] leading-[142.02%] font-medium opacity-[0.65] border-b border-gray-600">
          Posts
        </div>
        <div className="absolute top-[566px] left-[158px] tracking-[-0.02em] leading-[142.02%] font-medium opacity-[0.65]">
          Photos
        </div>
        <div className="absolute top-[566px] left-[296px] tracking-[-0.02em] leading-[142.02%] font-medium opacity-[0.65]">
          About
        </div>
        <div className="absolute top-[566px] left-[396px] tracking-[-0.02em] leading-[142.02%] font-medium opacity-[0.65]">
          Comments
        </div>
        {/* <img
          className="absolute top-[54px] left-[1688px] w-[59px] h-[59px] object-cover"
          alt=""
          src="/3135823-4@2x.png"
        /> */}
        {/* <img
          className="absolute top-[603px] left-[90px] w-[200px] h-[196px] object-cover"
          alt=""
          src="/3135823-5@2x.png"
        /> */}
        <Image
        className="absolute top-[354px] left-[90px] w-[160px] h-[156px] object-cover rounded-full"
        src={Image2}/>
        <button className="absolute top-[460px] left-[216px] w-[40px] h-[40px]  object-cover rounded-full bg-gray-600">
        <FontAwesomeIcon icon={faCameraRetro}  className=" w-[25px] h-[25px] text-white "/>
          </button>
          <div>
          <Information currentUserEmail={currentUserEmail}/>
          <div className=' shadow-md bg-red-500  absolute top-[1060px] left-[58px] rounded-md p-4 w-[400px] h-[50px]'>Photos</div>
          <Photos/>
          <div className='bg-slate-400 shadow-lg  absolute top-[650px] left-[600px] rounded-md p-4 w-[600px] '>
            <CreatePost/>
            <Posts currentUserEmail={currentUserEmail} userPerformed={true}/>
          </div>
          
          </div>
      </div>
    );
  };
  
  export default requireAuth(Profile);
  