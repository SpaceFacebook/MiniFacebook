import React from 'react';
import Image from 'next/image';
import logo from '../images/logoMiniFacebook.png';
import imgProfile from '../images/man.png';

const Header = () => {
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
        />
        
      </div>
    </div>
  );
};

export default Header;
