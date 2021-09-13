import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";
export const DoughnutChart = () => {
  const dataX = useMemo(() => {
    let a = 300;
    let b = 50;
    let c = 100;
    return { a: a, b: b, c: c };
  }, []);
  const data = {
    labels: ["Đang Mở", "Đang chờ", "Đã đóng"],
    datasets: [
      {
        label: "Loại cửa hàng mới tạo",
        data: [dataX.a, dataX.b, dataX.c],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 99, 132)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="doughnut">
      <Doughnut type="doughnut" data={data} />
    </div>
  );
};
