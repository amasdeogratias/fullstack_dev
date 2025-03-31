import React, { useContext, useEffect, useState } from 'react'
import AccessControl from '../components/AccessControl';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const AddUtilityBills = () => {
    const [utilityData, setUtilityData] = useState({
        type: "",
        amount: "",
        date: "",
        property_id: ""
    });
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const {currentUser} = useContext(UserContext)
    const tokenData = currentUser?.token

    const handleInputChange = (e) => {
        setUtilityData((prevState) => {
          return { ...prevState, [e.target.name]: e.target.value };
        });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/utilities/`,
            utilityData, 
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

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/properties/`);
                setProperties(response.data)
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchProperties()
    }, [])

  return (
    <div className="mx-auto p-4">
      <AccessControl />
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="lg:p-36 md:p-52 sm:20 p-4 w-full lg:w-1/2">
          {error && <p className="text-red-500 text-2xl py-2">{error}</p>}
          <h1 className="text-2xl font-semibold mb-4">Add Utility Bills</h1>
          <form method="POST" onSubmit={handleSubmit}>
            {/* <!-- Property Type Input --> */}
            <div className="mb-4">
                <label htmlFor="property_id">Property Name</label>
                <select
                    name="property_id"
                    id="property_id"
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    onChange={handleInputChange}
                >
                    <option value="">Select Property</option>
                    {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                        {property.name} - {property.type}
                    </option>
                    ))}
                </select>
            </div>
            {/* <!-- Property Type Input --> */}
            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-600">
               Utility Type
              </label>
              <select
                    name="type"
                    id="type"
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    onChange={handleInputChange}
                >
                    <option value="">Select Property</option>
                    <option value="electricity">Electricity</option>
                    <option value="water">Water</option>
                    <option value="gas">Gas</option>
                </select>
            </div>
            {/* <!-- Utility amount Input --> */}
            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-600">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>
            {/* <!-- Address Input --> */}
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-600">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>
            {/* <!-- save Button --> */}
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
  )
}

export default AddUtilityBills
