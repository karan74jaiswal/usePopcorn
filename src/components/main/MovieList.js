import Movie from "./Movie";
import MovieDetails from "./MovieDetails";
const MovieList = function ({
  movies,
  handleSelectedID,
  handleRemoveWatchedMovie,
}) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          handleSelectedID={handleSelectedID}
        >
          <MovieDetails
            movie={movie}
            handleRemoveWatchedMovie={handleRemoveWatchedMovie}
          />
        </Movie>
      ))}
    </ul>
  );
};

export default MovieList;
