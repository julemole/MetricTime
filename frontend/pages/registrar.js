import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import HoneyPot from "../components/HoneyPot";
import Error from "../components/Error";
import { useRouter } from "next/router";
import randomstring from "randomstring";
import getConfig from "next/config";
import axios from "axios";
const { publicRuntimeConfig: publicConfig } = getConfig();

export default function Register() {
  const router = useRouter();
  const [isRobot, setIsRobot] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [register, setRegister] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (evt) => {
    setUserData({
      ...userData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const form = new FormData(evt.target);

    if (form.get("verify") === "on") {
      setIsRobot(true);
      return;
    } else {
      setIsRobot(false);
    }
    const userValues = Object.values(userData);

    if (userValues.includes("")) {
      setIsError(true);
      setErrorLogin("Todos Los campos son obligatorios");
      return;
    }

    if (userData.repeatPassword !== userData.password) {
      setIsError(true);
      setErrorLogin("Las contraseñas no coinciden");
      return;
    }

    const newToken = randomstring.generate(16);

    const { data: newUser } = await axios.post(
      `${publicConfig.api_url}/api/postuser`,
      {
        username: userData.username,
        password: userData.password,
        email: userData.email,
        token: newToken,
      }
    );

    if (newUser.code !== 1) {
      setIsError(true);
      setErrorLogin("El correo ya existe, intente con otro nuevo");
      return;
    }
    setIsError(false);
    setErrorLogin("");
    setRegister("Registrado con exito");
    setTimeout(() => {
      router.push("/iniciar-sesion");
    }, 3000);
  };

  return (
    <Layout title={"Registrar"} notHeader={true} notNav={true}>
      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto w-30 h-30"
              src="/images/logo.png"
              alt="icono logo"
            />
            <h1 className="text-center text-3xl font-extrabold text-gray-900">
              Registrarse
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              O
              <Link href="/iniciar-sesion">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  {" "}
                  Iniciar Sesión
                </a>
              </Link>
            </p>
          </div>
          {register && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{register}.</span>
            </div>
          )}
          {isError && <Error message={errorLogin} />}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label for="nickname" className="sr-only">
                  Nickname
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nickname"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label for="email-address" className="sr-only">
                  Correo electronico
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label for="confirm-password" className="sr-only">
                  Password
                </label>
                <input
                  id="confirm-password"
                  name="repeatPassword"
                  type="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Repetir Contraseña"
                  onChange={handleChange}
                />
              </div>
              <HoneyPot />
            </div>
            {isRobot && (
              <div className="text-center text-red-500		">
                No se puede enviar el formulario , no es un humano
              </div>
            )}
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
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
}
