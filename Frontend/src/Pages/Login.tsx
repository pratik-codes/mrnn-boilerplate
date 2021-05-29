import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import Productively from "../Assets/Productively.svg";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../Redux/Store";
import { LoginAction } from "../Redux/Actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const { userInfo, error } = useSelector((state: RootStore) => state.userInfo);

  useEffect(() => {
    if (userInfo === true) {
      addToast("User logged in!", {
        appearance: "success",
        autoDismiss: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    if (error) {
      addToast(`${error}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [userInfo, error, addToast]);

  const login = async (event: any) => {
    event.preventDefault();
    const email = event.target[1].value;
    const password = event.target[2].value;
    await dispatch(LoginAction(email, password));
  };

  return (
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl mt-20 p-7 max-w-md w-full space-y-8 shadow-2xl">
        <div>
          <img className="mx-auto h-12 w-auto" src={Productively} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sing up if you don't have account.
            </a>
          </p>
        </div>
        <form action="" className="mt-8 space-y-6" onSubmit={login}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="/forgot"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
