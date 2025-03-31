import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const Properties = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;

  

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/properties/`);
        if (response) {
          setProperties(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredProperties = useMemo(() => {
    if (!filterType) {
      return properties;
    }
    return properties.filter((property) =>
      property.type.toLowerCase().includes(filterType.toLowerCase())
    );
  }, [properties, filterType]);

  const sortedProperties = useMemo(() => {
    let sortableProperties = [...filteredProperties];
    if (sortConfig !== null) {
      sortableProperties.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProperties;
  }, [filteredProperties, sortConfig]);

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = sortedProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    const totalPages = Math.ceil(properties.length / propertiesPerPage);

    const handlePageChange = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    };

  return (
    <>
      {/* */}
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            List of Properties
          </h2>

          <div className="mb-4">
            <label htmlFor="filterType" className="block text-sm font-medium text-gray-700">
              Filter by Type:
            </label>
            <input
              type="text"
              id="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light mb-4">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4" onClick={() => handleSort("name")}>
                          Property Name
                        </th>
                        <th scope="col" className="px-6 py-4" onClick={() => handleSort("type")}>
                          Property Type
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Address
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium" colSpan="5">
                            Loading...
                          </td>
                        </tr>
                      ) : currentProperties.length === 0 ? (
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium" colSpan="5">
                            No data found
                          </td>
                        </tr>
                      ) : (
                        currentProperties.map((property, index) => (
                          <tr key={index} className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">{property.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{property.type}</td>
                            <td className="whitespace-nowrap px-6 py-4">{property.address}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Link to={`/view-property/${property.id}`} className="text-blue-500 font-bold">
                                View
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Properties;