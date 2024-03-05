import { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Main from "./main/Main";
import Logo from "./navbar/Logo";
import Search from "./navbar/Search";
import NumberOfResults from "./navbar/NumberOfResults";
import MovieBox from "./main/MovieBox";
import Summary from "./main/Summary";
import MovieList from "./main/MovieList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import SelectedMovieDetails from "./main/SelectedMovieDetails";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() =>
    JSON.parse(localStorage.getItem("watched"))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  // const myRef = useRef(23);
  // console.log(myRef);
  const handleSelectedID = function (newId) {
    setSelectedMovieID((id) => (id === newId ? null : newId));
  };
  const resetSelected = function () {
    setSelectedMovieID(null);
  };

  function handleAddMovie(movie) {
    setWatched((oldWatched) => [
      ...oldWatched,
      { ...movie, runtime: Number.parseInt(movie.Runtime) || 0 },
    ]);
    resetSelected();
  }

  function handleRemoveWatchedMovie(movieImdbId) {
    setWatched((watched) => watched.filter((el) => el.imdbID !== movieImdbId));
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);

        const { Search: movieList } = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
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
    resetSelected();
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);

  useEffect(
    () => localStorage.setItem("watched", JSON.stringify(watched)),
    [watched]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <Search setQuery={setQuery} query={query} />
        <NumberOfResults movies={movies} />
      </Navbar>
      <Main>
        <MovieBox>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectedID={handleSelectedID} />
          )}
          {error && <ErrorMessage message={error} />}
        </MovieBox>
        <MovieBox>
          {selectedMovieID ? (
            <SelectedMovieDetails
              key={selectedMovieID}
              selectedMovieID={selectedMovieID}
              reset={resetSelected}
              handleAddMovie={handleAddMovie}
              userRating={
                watched.filter((el) => el.imdbID === selectedMovieID)[0]
                  ?.userRating || 0
              }
              watched={watched.find((el) => el.imdbID === selectedMovieID)}
            />
          ) : (
            <>
              <Summary movies={watched} />
              <MovieList
                movies={watched}
                handleSelectedID={handleSelectedID}
                handleRemoveWatchedMovie={handleRemoveWatchedMovie}
              />
            </>
          )}
        </MovieBox>
      </Main>
    </>
  );
}
