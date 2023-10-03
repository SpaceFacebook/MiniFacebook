import React, { useState } from 'react';
const Register = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  return (
    <div className=''>
         <div className="signup-header">
        <p className="m-0 text-black">
          <b>Sign up</b>
        </p>
        <p className="m-0 text-darkslategray bg-474656">It’s quick and easy</p>
      </div>
    <div className="registration-from">
      <div className=" bg-cae2fe bg-lavender shadow-lg rounded-lg p-8 w-98 row g-3 m-2">
        <div className="flex flex-wrap -mx-3 mb-4">
        <div className='w-full md:w-1/2 px-3 mb-4 '>
          <input
            type="text"
            id="firstName"
            className="border rounded-lg px-4 py-2 w-full"
            placeholder='First name'
          />
        </div>

        <div className='w-full md:w-1/2 px-3 mb-4 '>
          <input
            type="text"
            id="surname"
            className="border rounded-lg px-4 py-2 w-full"
            placeholder='Surname'
          />
        </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="email"
            className="border rounded-lg px-4 py-2 w-full"
            placeholder='Email address or phone number'
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            id="password"
            className="border rounded-lg px-4 py-2 w-full"
            placeholder='New password'
          />
        </div>

        <div className="mb-4">
          <label className="text-xxxl block bg-474656">Gender</label>
          <div className="flex">
            <label className="mr-4">
              <input type="radio" name="gender" value="female" className="border rounded-lg px-2 py-1 w-16 bg-white" />
              Female
            </label>
            <label className="mr-4">
              <input type="radio" name="gender" value="male" className="border rounded-lg px-2 py-1 w-16" />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="custom" className="border rounded-lg px-2 py-1 w-16" />
              Custom
            </label>
          </div>
        </div>

        <div className="mb-4">
      <label className="text-xxxl block bg-474656">Date of birth</label>
      <div className="flex">
        <select
          className="border rounded-lg px-2 py-1 w-16"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="">DD</option>
          {days.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <span className="mx-2">-</span>
        <select
          className="border rounded-lg px-2 py-1 w-24"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">MMM</option>
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <span className="mx-2">-</span>
        <select
          className="border rounded-lg px-2 py-1 w-24"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">YYYY</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Sign Up
        </button>

        <p className="mt-4 text-darkslategray text-sm">
          By clicking Sign Up, you will create your own space
        </p>
      </div>
    </div>
    </div>
  );
};

export default Register;