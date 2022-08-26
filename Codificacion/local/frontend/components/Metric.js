import { useEffect, useRef } from "react";
import Graph from "../components/Graph";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig: publicConfig } = getConfig();

export default function Metric({ disconnected, uuid, socket, type, mtToken }) {
  const graphReference = useRef();

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const { data: dataResult } = await axios.get(
          `${publicConfig.api_url}/api/metrics/${uuid}/${type}`
        );
        if (!graphReference.current) return;

        const chart = graphReference.current;
        const dataset = chart.data.datasets[0];
        const data = chart.data;

        const orderData = dataResult.reverse();
        if (Array.isArray(orderData)) {
          orderData.forEach((m) => {
            data.labels.push(format(parseISO(m.createdat), "HH:mm:ss"));
            dataset.data.push(m.value);
            chart.update("none");
            chart.update();
          });
        }
      } catch (error) {
        return;
      }
    }
    fetchMetrics();

    if (socket) {
      socket.on("agent/message", (payload) => {
        if (payload.token !== mtToken) return;

        if (payload.agent.uuid === uuid) {
          const metric = payload.metrics.find((m) => m.type === type);

          if (!graphReference.current) return;

          const chart = graphReference.current;
          const data = chart.data.datasets[0].data;
          const labels = chart.data.labels;

          if (data.length >= 20) {
            labels.shift();
            data.shift();
          }

          const labelM = format(metric.createdat, "HH:mm:ss");
          const dataM = metric.value;
          labels.push(labelM);
          data.push(dataM);

          chart.update("active");
        }
      });
    }
  }, [disconnected]);

  return (
    <div className="border-gray-200 rounded-lg h-auto md:p-4	">
      <div className=" bg-gray-50 p-2">
        <div className="h-auto">
          <Graph graphReference={graphReference} />
        </div>
      </div>
    </div>
  );
}
