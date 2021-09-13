import Chart from "react-apexcharts";
import "./AreaChart.css";
export const AreaChart = () => {
  const series = [
    {
      name: "Tổng Thu",
      data: [
        4000000, 20000000, 20403300, 3299000, 100500, 194000, 999020, 189000,
        1001023, 5331700, 100000, 9030000,
      ],
    },
    {
      name: "Tổng Chi",
      data: [
        3000000, 1000000, 3099000, 3200000, 1000500, 1940000, 999020, 1890000,
        10000023, 5331000, 10000000, 5000000,
      ],
    },
  ];
  const options = {
    chart: {
      height: "100%",
      type: "area",
      width: 600,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      min: 0,
      max: 12,
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      labels: {},
    },
    tooltip: {
      x: {},
    },
  };

  return (
    <Chart
      width="952"
      height="500"
      type="area"
      options={options}
      series={series}
    />
  );
};
