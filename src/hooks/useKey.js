import { useEffect } from "react";
const useKey = function (key, action) {
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) action();
    }
    document.addEventListener("keypress", callback);

    return () => {
      document.removeEventListener("keypress", callback);
    };
  }, [action, key]);
};
export { useKey };
