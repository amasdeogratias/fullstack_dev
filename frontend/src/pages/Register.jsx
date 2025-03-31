import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUserData(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const handleUserRegister = async (e) => {
        e.preventDefault();
        setError('')
        try {

        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, userData);
        console.log(response);
        if(response){

          navigate('/login')
        }
        
        } catch (err) {
          console.log(err);  
          setError(err.response.data.message)
        }
    }
  return (
    <div className="mx-auto p-4">
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="lg:p-36 md:p-52 sm:20 p-4 w-full lg:w-1/2">
        {error && <p className="text-red-500 text-2xl py-2">{error}</p>}
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form action="#" method="POST" onSubmit={handleUserRegister}>
            {/* <!-- Username Input --> */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>
             {/* <!-- Email Input --> */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>
            {/* <!-- Password Input --> */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>
            {/* <!-- Login Button --> */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Save
            </button>
          </form>
          {/* <!-- Sign up  Link --> */}
          <div className="mt-6 text-blue-500 text-center">
            <span>Already have an account <Link to="/login" className="underline">
              login
            </Link></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
