import React from 'react';

const Register = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="bg-lavender shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold mb-6">Sign up</h1>
        <p className="text-xl text-darkslategray mb-6">It's quick and easy</p>

        <div className="mb-4">
          <label htmlFor="firstName" className="text-xl block">First name</label>
          <input
            type="text"
            id="firstName"
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="surname" className="text-xl block">Surname</label>
          <input
            type="text"
            id="surname"
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-xl block">Email address or phone number</label>
          <input
            type="text"
            id="email"
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-xl block">New password</label>
          <input
            type="password"
            id="password"
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="text-xl block">Gender</label>
          <div className="flex">
            <label className="mr-4">
              <input type="radio" name="gender" value="female" className="mr-2" />
              Female
            </label>
            <label className="mr-4">
              <input type="radio" name="gender" value="male" className="mr-2" />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="custom" className="mr-2" />
              Custom
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xl block">Date of birth</label>
          <div className="flex">
            <input type="text" placeholder="DD" className="border rounded-lg px-2 py-1 w-16" />
            <span className="mx-2">-</span>
            <input type="text" placeholder="MMM" className="border rounded-lg px-2 py-1 w-24" />
            <span className="mx-2">-</span>
            <input type="text" placeholder="YYYY" className="border rounded-lg px-2 py-1 w-24" />
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
  );
};

export default Register;
