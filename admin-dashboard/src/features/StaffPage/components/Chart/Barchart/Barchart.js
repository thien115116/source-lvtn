import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ a, b, c, d }) {
  return (
    <div>
      <>
        <Bar
          style={{ maxHeight: 400 }}
          data={{
            labels: ["Số Request"],
            datasets: [
              {
                label: ["Pending"],
                data: [b],
                backgroundColor: ["#f9423c"],
                borderColor: ["rgb(255, 99, 132)"],
                borderWidth: 1,
              },
              {
                label: ["Done"],
                data: [d],
                backgroundColor: ["#1e90ff"],
                borderColor: ["rgb(255, 99, 132)"],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            maintainAspectRatio: true,
          }}
        />
      </>
    </div>
  );
}

export default BarChart;
