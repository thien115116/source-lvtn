import { Doughnut } from "react-chartjs-2";
export const DoughnutChart = () => {
  const data = {
    //labels: ["Món Ăn Được Bán", "Món Ăn Dừng Bán", "Món Ăn Chờ Duyệt"],
    datasets: [
      {
        label: "Loại cửa hàng mới tạo",
        data: [300, 50, 100],
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
