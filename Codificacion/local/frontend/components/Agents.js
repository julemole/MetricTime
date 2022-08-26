import { useEffect, useState } from "react";
import Agent from "./Agent";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig: publicConfig } = getConfig();

export default function Agents({ socket, mtToken }) {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function fetchAgents() {
      const { data: savedAgents } = await axios.get(
        `${publicConfig.api_url}/api/agents/${
          JSON.parse(localStorage.getItem("metrictimeUser")).id
        }`
      );
      setAgents((agents) => [...savedAgents]);
    }

    fetchAgents();

    socket.on("agent/connected", (payload) => {
      if (payload.token !== mtToken) return;
      const { uuid } = payload;
      const existAgent = agents.find((agent) => agent.uuid === uuid);
      if (!existAgent) {
        setAgents((agents) => [payload.agent, ...agents]);
      }
    });
  }, []);

  const removeAgent = (uuid) => {
    setAgents((agents) => [
      ...agents.filter((agent) => {
        return agent.uuid !== uuid;
      }),
    ]);
  };
  return (
    <>
      <div className="grid grid-cols-5 gap-x-2 grid-flow-row auto-rows-max ">
        <div className="col-span-5">
          {agents.length === 0 && (
            <div className="p-14 md:p-20 w-full flex flex-col items-center justify-center	">
              <img
                alt="icon disconnected"
                className="w-16 md:w-18"
                src="https://img.icons8.com/fluent/96/000000/wi-fi-disconnected.png"
              />
              <p className="text-center mt-6 font-bold	text-lg">
                No hay agentes conectados
              </p>
              <p className="text-center mt-6 font-bold	text-lg	">
                Envie Metricas desde un dispositivo electronico
              </p>
            </div>
          )}
          {agents.length !== 0 &&
            agents.map((agent) => {
              return (
                <Agent
                  mtToken={mtToken}
                  key={agent.uuid}
                  uuid={agent.uuid}
                  socket={socket}
                  removeAgent={removeAgent}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
