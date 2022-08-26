import { Line } from "react-chartjs-2";

export default function Graph({ graphReference }) {
  return (
    <div className="canvas-container mx-auto">
      <Line
        ref={graphReference}
        data={{
          labels: [],
          datasets: [
            {
              lineTension: 0.4,
              backgroundColor: "#ffb1c199",
              borderColor: "#ff6384",
              borderWidth: 2,
              borderJoinStyle: "round",
              fill: true,
              pointRadius: 3,
              pointBorderColor: "#ff6384",
              pointBackgroundColor: "#ffb1c1",
              pointBorderWidth: 3,
              data: [],
            },
          ],
        }}
        width={20}
        height={10}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
