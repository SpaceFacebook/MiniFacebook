// Login.js
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, resetAuth } from '../public/src/features/loginSlice'; // Importez les actions d'authentification
import imageLogin from "../images/imagelogin.png"
import Image from 'next/image';
import logo from "../images/logoMiniFacebook.png";
import { useRouter } from 'next/router';
import { setLoggedIn, setLoggedOut,setUserName} from '../public/src/features/loginSlice'
const Login = () => {
  const dispatch = useDispatch();
  
  const { email, password } = useSelector((state) => state.auth); // Accédez aux états d'authentification
  const router = useRouter();

    const handleLogin = async () => {
      const data = {
        email: email,
        password: password,
      };
    
      try {
        const response = await axios.post('http://localhost:8080/api/login', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200) {
          const { userName } = response.data;
          dispatch(setUserName(userName));
          dispatch(setLoggedIn());
          router.push('/');
          console.log('Login successful');
        } else {
          dispatch(setLoggedOut());
          console.error('Login failed');
        }
      } catch (error) {
       
        console.error('Error:', error);
      }
    
      // Réinitialisez les champs email et password après la soumission
      dispatch(resetAuth());
    };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <div className="mb-4 text-center">
          <Image src={imageLogin} alt="Istockphoto" width={200} height={200} />
          <div className="text-2xl font-bold">
            <Image src={logo} />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email address or phone number</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your email or phone number"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))} // Utilisez les actions d'authentification
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))} // Utilisez les actions d'authentification
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded-md font-medium w-full hover:bg-blue-600"
        >
          Log in
        </button>
        <p className="mt-4 text-center text-gray-600">
        
          <a href="#" className="text-blue-500 hover:underline">Create new account</a> ·{' '}
          <a href="#" className="text-blue-500 hover:underline">Forgotten password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
