import React, { useContext, useState } from "react";
import AccessControl from "../components/AccessControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const AddProperty = () => {
  const [propertyData, setPropertyData] = useState({
    name: "",
    type: "",
    address: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext)
  const tokenData = currentUser?.token

  const handleInputChange = (e) => {
    setPropertyData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/properties/`,
        propertyData, 
        {
            headers: {
                Authorization: `Bearer ${tokenData}`, // Include the token in the headers
                "Content-Type": "application/json",
              },
        }
      );
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      setError(error.response.data.message);
    }
  };
  return (
    <div className="mx-auto p-4">
      <AccessControl />
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="lg:p-36 md:p-52 sm:20 p-4 w-full lg:w-1/2">
          {error && <p className="text-red-500 text-2xl py-2">{error}</p>}
          <h1 className="text-2xl font-semibold mb-4">Add Property</h1>
          <form method="POST" onSubmit={handleSubmit}>
            {/* <!-- Property Name Input --> */}
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
            {/* <!-- Property Type Input --> */}
            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-600">
                Property Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>
            {/* <!-- address Input --> */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-600">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
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
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
