import { useEffect, useState } from "react";
import Metric from "../components/Metric";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig: publicConfig } = getConfig();

export default function Agent({ uuid, socket, mtToken, removeAgent }) {
  const [openMetric, setOpenMetric] = useState(false);
  const [agent, setAgent] = useState({
    name: null,
    hostname: null,
    connected: false,
    pid: null,
    error: null,
    metrics: [],
  });

  useEffect(() => {
    async function fetchAgent() {
      try {
        const {
          data: [dataAgent],
        } = await axios.get(`${publicConfig.api_url}/api/agent/${uuid}`);
        setAgent((agent) => ({
          ...agent,
          name: dataAgent.name,
          hostname: dataAgent.hostname,
          connected: dataAgent.connected,
          pid: dataAgent.pid,
        }));
      } catch (error) {
        console.log(error);
        return;
      }
      try {
        const { data: metrics } = await axios.get(
          `${publicConfig.api_url}/api/metrics/${uuid}`
        );

        setAgent((agent) => {
          return {
            ...agent,
            metrics,
          };
        });
      } catch (error) {
        console.log(error);

        return;
      }
    }
    fetchAgent();

    if (socket) {
      socket.on("agent/disconnected", (payload) => {
        if (payload.token !== mtToken) return;

        if (payload.agent.uuid === uuid) {
          setAgent((agent) => ({
            ...agent,
            connected: false,
          }));

          removeAgent(payload.agent.uuid);
        }
      });
    }
  }, []);
  const toggleMetric = () => {
    setOpenMetric(!openMetric);
  };
  return (
    <div
      className="p-2 sm:p-2 md:p-5 bg-gray-100 mb-2 font-	
    "
    >
      <div className="flex justify-between">
        <h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 inline-block pr-1.5"
          >
            <path d="M13 7H7v6h6V7z" />
            <path
              fillRule="evenodd"
              d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
              clipRule="evenodd"
            />
          </svg>{" "}
          <span className="font-bold text-sm md:text-lg">
            {agent.name} - {agent.pid}
          </span>
        </h3>
        <span>
          {agent.connected ? (
            <svg
              className="w-6 sm:w-8 text-green-500 animate-pulse inline-block 	"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 sm:w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
              />
            </svg>
          )}
        </span>
      </div>

      <p className="p-1 text-sm sm:text-lg"> {agent.hostname}</p>
      <button
        onClick={toggleMetric}
        className="text-sm sm:text-lg text-blue-900 p-1"
      >
        Ver Metricas{" "}
        {openMetric ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="inline-block w-6"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="inline-block w-6"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {openMetric && (
        <div className="m-1 sm:m-2 p-2 md:p-5 bg-white rounded-xl		">
          <ul className="list-none	">
            {agent.metrics.map((metric, idx) => (
              <li
                key={idx + Math.random() * 100}
                className="mb-2 hover:underline cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 text-indigo-400 inline-block"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>{" "}
                <button>{metric.type}</button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 inline-block"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <Metric
                  key={idx + Math.random() * 100}
                  uuid={uuid}
                  socket={socket}
                  type={metric.type}
                  mtToken={mtToken}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
