import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";



const Header = () => {

    const {currentUser} = useContext(UserContext);
    const token = currentUser?.token
  return (
    <nav className="bg-blue-700 border-b border-blue-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                    {/* <!-- Mobile menu button--> */}
                    <button
                    type="button"
                    id="mobile-dropdown-button"
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                    >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="block h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                    </button>
                </div>

                <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    {/* <!-- Logo --> */}
                    <a className="flex flex-shrink-0 items-center" href="/index.html">
                    <img
                        className="h-10 w-auto"
                        src="images/logo-white.png"
                        alt="Property MS"
                    />

                    <span className="hidden md:block text-white text-2xl font-bold ml-2">
                        Property MS
                    </span>
                    </a>
                    {/* <!-- Desktop Menu Hidden below md screens --> */}
                    <div className="hidden md:ml-6 md:block">
                    <div className="flex space-x-2">
                        <Link
                        to="/"
                        className="text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                        >
                        Home
                        </Link>
                        <Link
                        to="/"
                        className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                        >
                        Properties
                        </Link>
                        {token && (
                            <a
                            href="/add-property"
                            className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                            >
                            Add Property
                            </a>
                        )}
                    </div>
                    </div>
                </div>

                {/* <!-- Right Side Menu (Logged Out) --> */}
                {!token && (

                <div className="hidden md:block md:ml-6">
                    <div className="flex items-center">
                    <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                        <i className="fa-brands fa-google text-white mr-2"></i>
                        <Link to={`/login`}><span>Login or Register</span></Link>
                    </button>
                    </div>
                </div>
                )}

                {/* <!-- Right Side Menu (Logged In) --> */}
                {token && (

                <div>
                    <small>{currentUser?.name}</small>
                    <Link to={`/logout`}
                        className="block px-4 py-2 text-xl text-gray-50"
                        tabIndex="-1"
                        id="user-menu-item-2"
                    >
                        Sign Out
                    </Link>
                </div>
                )}
            </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
                to="/"
                className="bg-black text-white block rounded-md px-3 py-2 text-base font-medium"
            >
                Home
            </Link>
            <Link
                to="/"
                className="text-white block rounded-md px-3 py-2 text-base font-medium"
            >
                Properties
            </Link>
            <a
                href="/add-property.html"
                className="text-white block rounded-md px-3 py-2 text-base font-medium"
            >
                Add Property
            </a>
            {!token && (

            <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5">
                <i className="fa-brands fa-google mr-2"></i>
                <Link to={`/login`}><span>Login or Register</span></Link>
            </button>
            )}
            </div>
        </div>
    </nav>
  );
};

export default Header;
