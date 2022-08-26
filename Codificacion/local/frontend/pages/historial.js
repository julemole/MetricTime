import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Agent from "../components/Agent";
import getConfig from "next/config";

const { publicRuntimeConfig: publicConfig } = getConfig();

const History = () => {
  const [agents, setAgents] = useState([]);
  const [filterAgents, setFilterAgents] = useState([]);
  const [notFound, setNotFound] = useState([]);

  useEffect(() => {
    async function fetchAgents() {
      console.log(JSON.parse(localStorage.getItem("metrictimeUser")).id);
      const { data: savedAgents } = await axios.get(
        `${publicConfig.api_url}/api/history/agents/${
          JSON.parse(localStorage.getItem("metrictimeUser")).id
        }`
      );
      setAgents([...savedAgents, ...agents]);
      setFilterAgents([...savedAgents]);
    }

    fetchAgents();
  }, []);

  const handleSearchAgent = (evt) => {
    const filterAgts = agents.filter((agent) => {
      return (
        agent.name.toLowerCase().includes(evt.target.value.toLowerCase()) ||
        String(agent.pid).includes(evt.target.value) ||
        agent.hostname.toLowerCase().includes(evt.target.value.toLowerCase())
      );
    });

    setFilterAgents([...filterAgts]);
  };
  return (
    <>
      <Layout title="Historial">
        <main>
          <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="mt-6 mb-8 flex justify-center	">
              <h2 className="font-mono font-bold text-xl sm:text-2xl">
                <svg
                  className="w-8 inline-block text-blue-600 	 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{" "}
                Historial de Agentes
              </h2>
            </div>
            <div className="sm:px-2 py-6 sm:px-0">
              <div className="md:w-6/12 mx-auto mb-10 ">
                <div className="bg-white flex items-center rounded-full shadow-xl">
                  <input
                    className="placeholder-gray-600 sm:text-sm md:text-lg rounded-l-full w-full pt-4 px-6 text-gray-900 leading-tight focus:outline-none"
                    id="search"
                    type="text"
                    placeholder="Buscar agente por nombre"
                    onChange={handleSearchAgent}
                  />

                  <div className="p-4">
                    <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-8 h-8 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-12 xl:w-12 flex items-center justify-center">
                      <img
                        alt="not found icon"
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNNzIuMjQsMTAuMzJjLTMyLjMzMDYyLDAgLTU4LjQ4LDI2LjE0OTM4IC01OC40OCw1OC40OGMwLDMyLjMzMDYzIDI2LjE0OTM4LDU4LjQ4IDU4LjQ4LDU4LjQ4YzExLjU0MjgxLDAgMjIuMjI1NjMsLTMuMzg2MjUgMzEuMjgyNSwtOS4xMzc1bDQyLjI0NzUsNDIuMjQ3NWwxNC42MiwtMTQuNjJsLTQxLjcxLC00MS42MDI1YzcuNDk4MTMsLTkuODM2MjUgMTIuMDQsLTIyLjAyNDA2IDEyLjA0LC0zNS4zNjc1YzAsLTMyLjMzMDYyIC0yNi4xNDkzNywtNTguNDggLTU4LjQ4LC01OC40OHpNNzIuMjQsMjQuMDhjMjQuNzY1MzEsMCA0NC43MiwxOS45NTQ2OSA0NC43Miw0NC43MmMwLDI0Ljc2NTMxIC0xOS45NTQ2OSw0NC43MiAtNDQuNzIsNDQuNzJjLTI0Ljc2NTMxLDAgLTQ0LjcyLC0xOS45NTQ2OSAtNDQuNzIsLTQ0LjcyYzAsLTI0Ljc2NTMxIDE5Ljk1NDY5LC00NC43MiA0NC43MiwtNDQuNzJ6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-4 border-dashed border-gray-200 h-auto rounded-lg h-96 p-4	">
                <div className="grid grid-cols-5 gap-x-2 grid-flow-row auto-rows-max ">
                  <div className="col-span-5">
                    {agents.length === 0 ? (
                      <div className="p-20 w-full flex flex-col items-center justify-center	">
                        <img
                          alt="no se encuentra icono"
                          className="w-28"
                          src="https://img.icons8.com/color/96/000000/time-machine--v1.png"
                        />
                        <h5 className="mt-6 font-bold	text-lg">
                          No tienes agentes en el historial
                        </h5>
                        <h5 className="mt-6 font-bold	text-lg	">
                          Envia Metricas desde un dispositivo electronico
                        </h5>
                      </div>
                    ) : (
                      <>
                        {filterAgents.length !== 0 ? (
                          filterAgents.map((agent) => {
                            return <Agent key={agent.uuid} uuid={agent.uuid} />;
                          })
                        ) : (
                          <div className="p-20 w-full flex flex-col items-center justify-center	">
                            <img
                              alt="no hay elementos icono"
                              className="w-20"
                              src="https://img.icons8.com/color/48/000000/nothing-found.png"
                            />
                            <h5 className="mt-6 font-bold	text-lg">
                              No se encontraron agentes asociados con la
                              busqueda
                            </h5>
                            <h5 className="mt-6 font-bold	text-lg">
                              Intenta de nuevo
                            </h5>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};
export default History;
