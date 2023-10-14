import React from 'react';
import Image from 'next/image';
import logo from '../images/logoMiniFacebook.png';
import imgProfile from '../images/man.png';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const Header = () => {
  const userName = useSelector((state) => state.auth.userName);
  const router = useRouter();
  const handleProfil=()=>{
    router.push('/profil');
  }
  return (
    <div className="bg-white p-2 shadow-md top-0 sticky z-50 h-16 flex justify-between items-center">
      <div className="flex">
        <Image src={logo} height={100} width={260} />
      </div>
      <div className="flex items-center space-x-2">
  <Image
    src={imgProfile}
    height={40}
    width={40}
    className="rounded-full cursor-pointer"
    onClick={handleProfil}
  />
  <span className="font-bold ml-2">{userName}</span>
</div>
</div>
  );
};

export default Header;
