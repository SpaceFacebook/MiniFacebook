import Head from "next/head";
import imageLogin from "../images/imagelogin.png"
import React from 'react';
import Image from 'next/image'; // Importer le composant Image de Next.js pour gérer les images
import logo from "../images/logoMiniFacebook.png"
const Login = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <div className="mb-4 text-center">
          <Image src={imageLogin} alt="Istockphoto" width={200} height={200} />
          <div className="text-2xl font-bold"><Image src={logo}/></div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email address or phone number</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your email or phone number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your password"
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md font-medium w-full hover:bg-blue-600">
          Log in
        </button>
        <p className="mt-4 text-center text-gray-600">
          <a href="#" className="text-blue-500 hover:underline">Create new account</a> ·{" "}
          <a href="#" className="text-blue-500 hover:underline">Forgotten password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
