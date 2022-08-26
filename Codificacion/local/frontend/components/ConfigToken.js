import { useState, useEffect } from "react";
import getConfig from "next/config";
import randomstring from "randomstring";
import Error from "./Error";
import axios from "axios";
const { publicRuntimeConfig: publicConfig } = getConfig();

export default function ConfigToken() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [idUser, setIdUser] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [tokenUpdated, setTokenUpdated] = useState("");

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("metrictimeUser")) || {
      token: "",
    };
    setToken(user.token);
    setUser(user);
    setIdUser(user.id);
  }, []);

  const generateToken = async () => {
    const newToken = randomstring.generate(16);
    const { data: tokenUpdate } = await axios.put(
      `${publicConfig.api_url}/api/putToken`,
      {
        id: idUser,
        token: newToken,
      }
    );
    if (tokenUpdate.code != 1) {
      setTokenUpdated("");
      setIsError(true);
      setErrorLogin("Ha ocurrido un error al generar token");
      return;
    }
    localStorage.removeItem("metrictimeUser");
    localStorage.setItem(
      "metrictimeUser",
      JSON.stringify({
        ...user,
        token: newToken,
      })
    );
    setIsError(false);
    setErrorLogin("");
    setTokenUpdated("Se ha actualizado el token");
    setToken(newToken);

    setTimeout(() => {
      setTokenUpdated("");
      setIsError(false);
      setErrorLogin("");
    }, 3000);
  };

  return (
    <main className="mt-10 sm:mt-0">
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
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>{" "}
              Configuraciones
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Establece las configuraciones necesarias
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          {tokenUpdated && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{tokenUpdated}.</span>
            </div>
          )}
          {isError && <Error message={errorLogin} />}
          <form>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Token
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      disabled
                      value={token}
                      onChange={(evt) => {
                        setToken(evt.target.value);
                      }}
                      className="p-4 mt-1 mb-2 focus:ring-indigo-500  h-8 border-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />

                    <button
                      onClick={generateToken}
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Generar Token
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6"></div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
