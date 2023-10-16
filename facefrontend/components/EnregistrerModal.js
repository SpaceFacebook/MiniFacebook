import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUserName,
  setFirstName,
  setSurName,
  setEmail,
  setPassword,
  setGender,
  setSelectedDay,
  setSelectedMonth,
  setSelectedYear,
  resetAuth,
} from '../public/src/features/loginSlice';
import { useRouter } from 'next/router';
import { setLoggedIn } from '../public/src/features/loginSlice';

const RegisterModal = ({ onClose }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const monthMappings = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
    'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12',
  };
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    firstName,
    surName,
    email,
    password,
    gender,
    selectedDay,
    selectedMonth,
    selectedYear,
  } = useSelector((state) => state.auth);
  const [error, setemailExistsError] = useState({ emailExistsError: '' });

  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    const formattedMonth = monthMappings[selectedMonth];
    const formattedDate = `${selectedYear}-${formattedMonth}-${selectedDay}`;

    const data = {
      firstName: firstName,
      surName: surName,
      email: email,
      password: password,
      gender: gender,
      dateBirth: formattedDate,
    };

    // Validation des champs
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!surName.trim()) {
      newErrors.surName = 'Surname is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Email must contain an "@"';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must have at least 6 characters';
    }

    if (!gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!selectedDay || !selectedMonth || !selectedYear) {
      newErrors.dateBirth = 'Date of birth is required';
    }

    setErrors(newErrors);

    // Si des erreurs sont présentes, ne pas poursuivre l'inscription
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        dispatch(setLoggedIn());
        dispatch(setUserName(firstName + ' ' + surName));
        dispatch(setEmail(email));
        router.push('/');
        console.log('Registration successful');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Email exists error
        setemailExistsError({ emailExistsError: 'Email already exists. Please use a different email.' });
        // Réinitialisation des champs
      /*dispatch(setEmail(''));
      dispatch(setPassword(''));
      dispatch(setFirstName(''));
      dispatch(setSurName(''));
      dispatch(setGender(''));
      dispatch(setSelectedDay(''));
      dispatch(setSelectedMonth(''));
      dispatch(setSelectedYear(''));*/
        console.log('error',error)
      } else {
        console.error('Error:', error);
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="">
          <div className="signup-header">
            <button onClick={onClose} className="close-button">
              &#10006;
            </button>
            <p className="m-0 text-black">
              <b>Sign up</b>
            </p>
            <p className="m-0 text-darkslategray bg-474656">It’s quick and easy</p>
          </div>
          <div className="underline"></div>
          <div className="registration-from">
            <div className="bg-cae2fe bg-lavender shadow-lg rounded-lg p-8 w-98 row g-3 m-2">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <input
                    type="text"
                    id="firstName"
                    className="border rounded-lg px-4 py-2 w-full"
                    placeholder="First name"
                    onChange={(e) => dispatch(setFirstName(e.target.value))}
                  />
                  {errors.firstName && (
                    <div className="text-red-500 text-sm">{errors.firstName}</div>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <input
                    type="text"
                    id="surname"
                    className="border rounded-lg px-4 py-2 w-full"
                    placeholder="Surname"
                    onChange={(e) => dispatch(setSurName(e.target.value))}
                  />
                  {errors.surName && (
                    <div className="text-red-500 text-sm">{errors.surName}</div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="email"
                  className="border rounded-lg px-4 py-2 w-full"
                  placeholder="Email address or phone number"
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  className="border rounded-lg px-4 py-2 w-full"
                  placeholder="New password"
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                />
                {errors.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  className="mt-1 p-2 w-full border rounded-md"
                  value={gender}
                  onChange={(e) => dispatch(setGender(e.target.value))}
                >
                  <option value="">Select gender</option>
                  <option value="FEMALE">Female</option>
                  <option value="MALE">Male</option>
                  <option value="CUSTOM">Custom</option>
                </select>
                {errors.gender && (
                  <div className="text-red-500 text-sm">{errors.gender}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <div className="flex">
                  <select
                    className="mt-1 p-2 w-1/4 border rounded-md"
                    value={selectedDay}
                    onChange={(e) => dispatch(setSelectedDay(e.target.value))}
                  >
                    <option value="">Day</option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    className="mt-1 p-2 w-1/4 border rounded-md"
                    value={selectedMonth}
                    onChange={(e) => dispatch(setSelectedMonth(e.target.value))}
                  >
                    <option value="">MM</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    className="mt-1 p-2 w-1/4 border rounded-md"
                    value={selectedYear}
                    onChange={(e) => dispatch(setSelectedYear(e.target.value))}
                  >
                    <option value="">yyyy</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.dateBirth && (
                  <div className="text-red-500 text-sm">{errors.dateBirth}</div>
                )}
              </div>
              {error.emailExistsError && (
  <div className="text-red-500 text-sm">{error.emailExistsError}</div>
)}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleRegister}
              >
                Sign Up
              </button>
              <p className="mt-4 text-darkslategray text-sm">
                By clicking Sign Up, you will create your own space
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
