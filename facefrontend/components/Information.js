import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditDetailsModal from './EditDetailsModal';
function Information({ currentUserEmail, userInfo }) {
  // const [userInfo, setUserInfo] = useState(null);
  console.log("email from backend: ",currentUserEmail)
  const [isModalOpen, setIsModalOpen] = useState(false);
  // useEffect(() => {
  //   const USER_INFO_URL = `http://localhost:8080/api/userInfo?userEmail=${currentUserEmail}`;

  //   axios
  //     .get(USER_INFO_URL)
      
  //     .then((response) => {
  //       setUserInfo(response.data);
  //       // console.log("data from backend :",userInfo)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user information:', error);
  //     });
  // }, [currentUserEmail]);
 
// Function to open the modal
const openModal = () => {
  setIsModalOpen(true);
};
  return (
    <div className='shadow-md bg-slate-400 absolute top-[650px] left-[58px] rounded-md p-4 w-[400px] h-[400px]'>
      <strong className='mb-5'>Intro</strong>
      {userInfo ? (
        <>
          
          <p>First name: {userInfo.firstName}</p>
          <br/>
          <p>Last name: {userInfo.surName}</p>
          <br/>
          <p>Email: {userInfo.email}</p>
          <br/>
          <p>Date of birth: {userInfo.dateBirth}</p>
          <br/>
          <p>Gender: {userInfo.gender}</p>
          <br/>
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
      {isModalOpen && ( // Render the modal if isModalOpen is true
        <EditDetailsModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)} // Function to close the modal
          userInfo={userInfo} // Pass the user information to the modal
        />
      )}
      {console.log("userInformation que je veux passe au editmodal ",userInfo)}
      
    </div>
  );
}

export default Information;
