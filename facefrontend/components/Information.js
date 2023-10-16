import React, { useState, useEffect } from 'react';
import EditDetailsModal from './EditDetailsModal';
function Information({ currentUserEmail, userInfo }) {
  console.log("email from backend: ",currentUserEmail)
  const [isModalOpen, setIsModalOpen] = useState(false);
 
// Function to open the modal
const openModal = () => {
  setIsModalOpen(true);
};
const handleUpdateUserInfo = (updatedUserInfo) => {
  // Update user information in your application state
  setUser(updatedUserInfo);
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
          <p>Date of birth: {new Date(userInfo.dateBirth).toLocaleDateString()}</p>
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
          onRequestUpdateUserInfo={handleUpdateUserInfo}
        />
      )}
      
    </div>
  );
}

export default Information;
