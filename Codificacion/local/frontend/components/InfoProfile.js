import { useState, useEffect } from "react";
import getConfig from "next/config";
import Error from "./Error";
import axios from "axios";
const { publicRuntimeConfig: publicConfig } = getConfig();

export default function InfoProfile() {
  const [isError, setIsError] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [userUpdated, setUserUpdated] = useState("");

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    id: "",
  });

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("metrictimeUser"));
    setUserData({
      username: user.username,
      email: user.email,
      password: user.password,
      id: user.id,
    });
  }, []);
  const handleChange = (evt) => {
    setUserData({
      ...userData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    console.log(userData);
    const { data: userUpdate } = await axios.put(
      `${publicConfig.api_url}/api/putuser`,
      userData
    );
    if (Object.values(userData).includes("")) {
      setIsError(true);
      setErrorLogin("Debes llenar los campos");
      return;
    }
    if (userUpdate.code !== 1) {
      setUserUpdated("");
      setIsError(true);
      setErrorLogin("Ha ocurrido un errro al actualizar los campos");
      return;
    }
    setIsError(false);
    setErrorLogin("");
    setUserUpdated("Se ha actualizado su información");
    setUserData({
      ...userData,
      email: userData.email,
      username: userData.username,
      password: userData.password,
    });
    setTimeout(() => {
      setUserUpdated("");
      setIsError(false);
      setErrorLogin("");
    }, 3000);
  };
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 inline-block"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              Información Personal
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Puedes Modificar tu cuenta
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          {userUpdated && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{userUpdated}.</span>
            </div>
          )}
          {isError && <Error message={errorLogin} />}
          <form>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="nickname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="nickname"
                      value={userData.username}
                      onChange={handleChange}
                      className="p-4 mt-1 focus:ring-indigo-500  h-8 border-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={userData.password}
                      onChange={handleChange}
                      className="p-4 mt-1 focus:ring-indigo-500 h-8 border-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="p-4 mt-1 focus:ring-indigo-500 h-8 border-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
