import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Assurez-vous d'installer cette bibliothèque
import { useDispatch } from 'react-redux';
import { setUserInfo,setFirstName, setUserName } from '../public/src/features/loginSlice';

 const EditDetailsModal=({ isOpen, onRequestClose, userInfo, onRequestUpdateUserInfo })=> {
  const dispatch=useDispatch();

  const [updatedUserInfo, setUpdatedUserInfo] = useState(userInfo);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Include the user's ID in the URL
    const updateUrl = `http://localhost:8080/api/updateUserInfo?id=${updatedUserInfo.id}`;

    // Send the updated user information to the backend
    axios.post(updateUrl, updatedUserInfo)
      .then((response) => {
        // Handle success, e.g., show a success message
        console.log('User information updated successfully', response.data);
        //dispatch(setUserresponse.data)
         dispatch(setUserInfo(updatedUserInfo));
         dispatch(setFirstName(updatedUserInfo.firstName))
         dispatch(setUserName(updatedUserInfo.firstName))
        onRequestUpdateUserInfo(updatedUserInfo);
        onRequestClose();
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error('Error updating user information', error);
      });

    // Close the modal
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal" // Ajoutez une classe similaire à celle de RegisterModal
      overlayClassName="modal-overlay" // Ajoutez une classe similaire à celle de RegisterModal
    >
      <div className=''>
      <div className='signup-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <p className="m-0 text-black">
            <b>Edit Details</b>
          </p>
        <button className="text-gray-500 cursor-pointer" onClick={onRequestClose}>&#10006;</button>
          
        </div>
        <div className="underline"></div>
        <div className="registration-from">
          <div className="bg-cae2fe bg-lavender shadow-lg rounded-lg p-8 w-98 row g-3 m-2">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={updatedUserInfo.firstName}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="surName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="surName"
                  value={updatedUserInfo.surName}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={updatedUserInfo.email}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="dateBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="text"
                  name="dateBirth"
                  value={new Date(updatedUserInfo.dateBirth).toLocaleDateString()}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="flex">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={updatedUserInfo.gender === "FEMALE"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={updatedUserInfo.gender === "MALE"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="CUSTOM"
                    checked={updatedUserInfo.gender === "CUSTOM"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Custom
                </label>

                </div>
              </div>

              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditDetailsModal;