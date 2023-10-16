import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditDetailsModal from './EditDetailsModal';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {setUserInfo}  from '../public/src/features/loginSlice';
import { useDispatch } from 'react-redux';

const Information=()=> {
  const currentUserEmail = useSelector((state) => state.auth.email);
  //const [userInfo, setUserInfo] = useState(null);
  const userInfo=useSelector((state)=>state.auth.userInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch =useDispatch();
  const openModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    const USER_INFO_URL = `http://localhost:8080/api/userInfo?userEmail=${currentUserEmail}`;

    axios
      .get(USER_INFO_URL)
      .then((response) => {
        //setUserInfo(response.data);
        dispatch(setUserInfo(response.data))
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
      });
  }, [currentUserEmail]);

  return (
    <div className="shadow-md bg-slate-400 absolute top-[650px] left-[58px] rounded-md p-4 w-[400px] h-[400px]">
      <strong className="mb-5">Intro</strong>
      {userInfo ? (
        <>
          <p>First name: {userInfo.firstName}</p>
          <p>Last name: {userInfo.surName}</p>
          <p>Email: {userInfo.email}</p>
          <p>Date of birth: {userInfo.dateBirth}</p>
          <p>Gender: {userInfo.gender}</p>
        </>
      ) : (
        <p>Loading user information...</p>
      )}
      <button
        className="absolute w-[170px] h-[40px] object-cover bg-gray-600 rounded-xl text-white"
        onClick={openModal}
      >
        Edit details
      </button>
      {isModalOpen && (
        <EditDetailsModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          userInfo={userInfo}
         
        />
      )}
    </div>
  );
}

export default Information;
