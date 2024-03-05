import StarRating from "./StarRating";
import { useState, useEffect } from "react";
import Loader from "../Loader";
const SelectedMovieDetails = function ({
  selectedMovieID,
  reset,
  userRating,
  handleAddMovie,
  watched,
}) {
  // State Declarations
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [myRating, setMyRating] = useState(userRating);

  // Side Effects
  useEffect(() => {
    if (!selectedMovieID) return;
    const controller = new AbortController();
    async function fetchSelectedMovieDetails() {
      setIsLoading(true);
      try {
        const movieDetails = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedMovieID}`,
          { signal: controller.signal }
        ).then((res) => res.json());

        setIsLoading(false);
        setMovie(movieDetails);
      } catch (err) {
        if (err.name !== "AbortError") console.warn(err);
      }
    }
    fetchSelectedMovieDetails();

    return () => controller.abort();
  }, [selectedMovieID]);

  useEffect(() => {
    if (!movie) return;
    document.title = `${movie.Title} (${movie.Year})`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie]);

  useEffect(() => {
    const closeSelectedMovieDetails = function (e) {
      if (e.code === "KeyQ") reset();
    };
    document.addEventListener("keydown", closeSelectedMovieDetails);

    return () => {
      document.removeEventListener("keydown", closeSelectedMovieDetails);
    };
  }, [reset]);

  // JSX
  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && movie ? (
        <>
          <header>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released || movie.Year} . {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>⭐️ {movie.imdbRating} IMDb rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!watched ? (
                <>
                  <StarRating
                    size={25}
                    defaultRating={myRating}
                    onSetRating={setMyRating}
                  />
                  {myRating > 0 ? (
                    <button
                      className="btn-add"
                      onClick={() =>
                        handleAddMovie({
                          Poster: movie.Poster,
                          Title: movie.Title,
                          imdbID: movie.imdbID,
                          imdbRating: movie.imdbRating,
                          userRating: myRating,
                          Runtime: movie.Runtime,
                          Year: movie.Year,
                        })
                      }
                    >
                      +Add to list
                    </button>
                  ) : null}
                </>
              ) : (
                <p>You have already rated this movie {myRating}🌟</p>
              )}
            </div>
            <p>{movie.Plot}</p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
          <button className="btn-back" onClick={reset}>
            ←
          </button>
        </>
      ) : null}
    </div>
  );
};
export default SelectedMovieDetails;
