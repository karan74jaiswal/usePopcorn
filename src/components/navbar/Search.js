import { useRef, useEffect } from "react";

const Search = function ({ query, setQuery }) {
  const inputElement = useRef(null);

  useEffect(() => {
    function callBack(e) {
      if (
        e.key === "Enter" &&
        document.activeElement !== inputElement.current
      ) {
        inputElement.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keypress", callBack);

    return () => document.removeEventListener("keypress", callBack);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
};

export default Search;
