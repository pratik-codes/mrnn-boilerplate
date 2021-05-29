import React, { ChangeEventHandler, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useToasts, ToastProvider } from "react-toast-notifications";
import Productively from "../Assets/Productively.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../Redux/Store";
import { RegisterAction } from "../Redux/Actions/userActions";

export default function Register() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const { userInfo, error } = useSelector(
    (state: RootStore) => state.userRegister
  );

  useEffect(() => {
    if (userInfo === true) {
      addToast("User Registered", {
        appearance: "success",
        autoDismiss: true,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
    if (error) {
      addToast(`${error}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [userInfo, error, addToast]);

  const register = async (event: any) => {
    event.preventDefault();
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    await dispatch(RegisterAction(name, email, password));
  };

  return (
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl mt-20 p-7 max-w-md w-full space-y-8 shadow-2xl">
        <div>
          <img className="mx-auto h-12 w-auto" src={Productively} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sing in if you already have account.
            </a>
          </p>
        </div>
        <form action="" className="mt-8 space-y-6" onSubmit={register}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="Name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
