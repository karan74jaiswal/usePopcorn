import { useState } from "react";
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
import { useMovies } from "../hooks/useMovies";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
export default function App() {
  const [query, setQuery] = useState("");

  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  // const myRef = useRef(23);
  // console.log(myRef);
  const handleSelectedID = function (newId) {
    setSelectedMovieID((id) => (id === newId ? null : newId));
  };
  function resetSelected() {
    setSelectedMovieID(null);
  }

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
