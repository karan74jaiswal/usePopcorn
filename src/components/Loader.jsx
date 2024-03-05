import { RotatingLines } from "react-loader-spinner";
const Loader = function () {
  return (
    <p className="loader">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        strokeColor="#6741d9"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </p>
  );
};
export default Loader;
