import React, { useState } from 'react';
import Modal from 'react-modal'; // Assurez-vous d'installer cette bibliothèque

function EditDetailsModal({ isOpen, onRequestClose, userInfo }) {
  const [updatedUserInfo, setUpdatedUserInfo] = useState(userInfo);
  console.log("user: ",userInfo)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyez les données mises à jour au backend ici
    // Assurez-vous que `updatedUserInfo` contient les données mises à jour
    // Après avoir traité la mise à jour, vous pouvez fermer le modal en appelant `onRequestClose`
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal" // Ajoutez une classe similaire à celle de RegisterModal
      overlayClassName="modal-overlay" // Ajoutez une classe similaire à celle de RegisterModal
    >
      <div className=''>
      <div className='signup-header' style={{ justifyContent: 'space-between' }}>
        <button className="text-gray-500 cursor-pointer " onClick={onRequestClose}>&#10006;</button>
          <p className="m-0 text-black">
            <b>Edit Details</b>
          </p>
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
                <label htmlFor="dateBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="text"
                  name="dateBirth"
                  value={updatedUserInfo.dateBirth}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full"
                />
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
