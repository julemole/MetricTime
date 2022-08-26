import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import Error from "../components/Error";
import { useRouter } from "next/router";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig: publicConfig } = getConfig();

export default function Login() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    setUserData({
      ...userData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = userData;

    if (email === "" || password === "") {
      setIsError(true);
      setErrorLogin("Todos Los campos son obligatorios");
      return;
    }
    const {
      data: [user],
    } = await axios.get(
      `${publicConfig.api_url}/api/getuser/${userData.email}`
    );

    if (!user) {
      setIsError(true);
      setErrorLogin("El usuario o contraseña son incorrectos");
      return;
    }

    if (user.password !== userData.password) {
      setIsError(true);
      setErrorLogin("El usuario o contraseña son incorrectos");
      return;
    }
    setIsError(false);
    setErrorLogin("");
    localStorage.setItem("metrictimeUser", JSON.stringify(user));
    router.push("/dashboard");
  };
  return (
    <>
      <Layout title={"Login"} notHeader={true} notNav={true}>
        <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto w-24 h-22 sm:w-30 sm:h-30"
                src="/images/logo.png"
                alt="icono logo"
              />
              <h1 className="text-center text-3xl font-extrabold text-gray-900">
                Iniciar Sesión
              </h1>
              <p className="mt-2 text-center text-sm text-gray-600">
                O
                <Link href="/registrar">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    {" "}
                    Crea una cuenta
                  </a>
                </Link>
              </p>
            </div>

            {isError && <Error message={errorLogin} />}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label htmlFor="email-address" className="sr-only">
                    Correo electronico
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                    onChange={handleChange}
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
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </main>
      </Layout>
    </>
  );
}
