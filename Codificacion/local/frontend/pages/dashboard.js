import { useEffect, useState } from "react";
import Agents from "../components/Agents";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import io from "socket.io-client";

export default function Dashboard() {
  const router = useRouter();
  const socket = io();
  socket.open();

  const [mtToken, setMtToken] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("metrictimeUser")) {
      router.push("/iniciar-sesion");
      return;
    }
    setMtToken(JSON.parse(localStorage.getItem("metrictimeUser")).token);
    return () => {
      socket.close();
    };
  }, []);

  return (
    <Layout title="Dashboard">
      <main>
        <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center	">
            <h2 className="font-mono font-bold text-xl sm:text-2xl">
              <img
                alt="wifi icon"
                className="w-10 inline-block text-blue-600"
                src="https://img.icons8.com/cotton/64/000000/wifi--v1.png"
              />{" "}
              Agentes Conectados
            </h2>
          </div>

          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 h-auto rounded-lg h-96 p-4	">
              {socket && mtToken && (
                <Agents mtToken={mtToken} socket={socket} />
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
