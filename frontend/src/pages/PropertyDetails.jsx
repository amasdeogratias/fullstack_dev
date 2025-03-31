import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [utilityBills, setUtilityBills] = useState([]);

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details", error);
      }
    };

    const fetchUtilityBills = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/utilities/${id}`);
        setUtilityBills(response.data);
      } catch (error) {
        console.error("Error fetching utility bills", error);
      }
    };

    fetchPropertyDetails();
    fetchUtilityBills();
  }, [id]);

  if (!property) return <p className="text-center p-6">Loading property details...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6 p-4 shadow-lg border rounded-lg">
        <div>
          <h2 className="text-2xl font-bold mb-2">{property.name}</h2>
          <p className="text-gray-700">{property.address}</p>
          <p className="text-gray-500">{property.type}</p>
        </div>
      </div>

      <div className="mb-6 p-4 shadow-lg border rounded-lg">
        {token && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Utility Bills</h3>
          {utilityBills.length > 0 ? (
            <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Utility Type
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {utilityBills.map((bill, index) => (
                        <tr key={index} className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">{bill.type}</td>
                            <td className="whitespace-nowrap px-6 py-4">{bill.amount}</td>
                            <td className="whitespace-nowrap px-6 py-4">{bill.date}</td>
                        </tr>
                    ))}
                    </tbody>
            </table>
            // <ul>
            //   {utilityBills.map((bill, index) => (
            //     <li key={index} className="border-b py-2 flex justify-between">
            //       <span>{bill.type}</span>
            //       <span>{bill.amount}</span>
            //       <span className="text-gray-500">{bill.date}</span>
            //     </li>
            //   ))}
            // </ul>
          ) : (
            <p className="text-gray-500">No utility bills available.</p>
          )}
        </div>
        )}
      </div>

      <button 
        onClick={() => navigate("/add-utility-bill")} 
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
        Add New Utility Bill
      </button>
    </div>
  );
};

export default PropertyDetails;
