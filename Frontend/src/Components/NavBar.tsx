import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ComponentsStyles/NavBar.css";
import Productively from "../Assets/Productively.svg";

export default function NavBar() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const logout = () => {
    console.log("logout");
    window.localStorage.removeItem("accessToken"); //remove one item
    window.location.reload();
  };
  return (
    <div className="NavWrapper">
      <div className="NavContainer ">
        <div className="grid-cols-2 ml-8">
          <Link to="/dashboard">
            <button className="focus:outline-none p-2 text-sm font-medium text-gray-300 hover:text-white  duration-300">
              DASHBOARD
            </button>
          </Link>
        </div>
        <div className="flex bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl px-2 ">
          <div className="flex flex-wrap content-center">
            <img className="h-8" src={Productively} alt="logo" />
          </div>
          <div className="grid-cols-8">
            <Link to="/">
              <button className="focus:outline-none px-2 py-2.5">
                <h2 className="font-bold">BRANDNAME</h2>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex width-screen grid-cols-2 mr-8">
          {login ? (
            <button
              onClick={logout}
              className="focus:outline-none border-gray-500 p-3 text-sm font-medium text-gray-300 hover:text-white duration-300"
            >
              LOGOUT
            </button>
          ) : (
            <Link to="/register">
              <button className="focus:outline-none border-gray-500 p-3 text-sm font-medium text-gray-300 hover:text-white duration-300">
                REGISTER
              </button>
            </Link>
          )}

          <div className="border-2 border-gray-600 rounded-2xl ml-5 flex flex-wrap content-center px-2 py-2 text-gray-300 hover:text-white">
            <Link to="/notification">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
