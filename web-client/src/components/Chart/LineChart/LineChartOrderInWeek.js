import { Line } from "react-chartjs-2";
import { useMemo } from "react";
export const LineCLineChartOrderInWeek = () => {
  let data = useMemo(() => {
    let dataRaw = {
      labels: [
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
        "Chủ Nhật",
      ],
      datasets: [
        {
          label: "Số Đơn",
          data: [1, 2, 3, 4, 5, 6, 7, 8],
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
