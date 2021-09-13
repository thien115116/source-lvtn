import { Line } from "react-chartjs-2";
import { useMemo } from "react";
export const LineChartEmployee = () => {
  let data = useMemo(() => {
    let dataRaw = {
      labels: [
        "Chủ nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
      ],
      datasets: [
        {
          label: "Số nhân viên làm việc trong tuần",
          data: [2, 5, 3, 4, 5, 1, 3],
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
