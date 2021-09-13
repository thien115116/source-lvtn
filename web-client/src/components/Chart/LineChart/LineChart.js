import { Line } from "react-chartjs-2";
import { useMemo } from "react";
export const LineChart = () => {
  let data = useMemo(() => {
    let dataRaw = {
      labels: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
      ],
      datasets: [
        {
          label: "Hoạt Động Trong Quý 1",
          data: [65, 59, 80, 95, 56, 55, 10],
          fill: false,
          backgroundColor: "#335372",
          borderColor: "rgb(251, 177, 177)",
          tension: 0.1,
        },
      ],
    };
    return dataRaw;
  }, []);

  return (
    <div className="">
      <Line type="line" data={data} />
    </div>
  );
};
