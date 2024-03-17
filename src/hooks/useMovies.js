import { useState, useEffect } from "react";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // callback?.();
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);

        const { Search: movieList } = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
          { signal: controller.signal }
        ).then((res) => res.json());
        if (!movieList) throw new Error("No movies with that name");
        setMovies(movieList);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (!query || query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    // resetSelected();
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
