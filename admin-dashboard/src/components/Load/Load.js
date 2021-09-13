import Lottie from "react-lottie";
import loadData from "../../assets/lottie/mainLoad.json";
export const LoadAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      style={{ minHeight: "calc(100vh - 60px)" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};
