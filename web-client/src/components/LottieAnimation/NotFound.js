import Lottie from "react-lottie";
import pageNotFound from "assets/lottie/notfound.json";
export const NotFoundAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pageNotFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <Lottie options={defaultOptions} />
    </div>
  );
};
