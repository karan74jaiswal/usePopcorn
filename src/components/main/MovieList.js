import Movie from "./Movie";
import MovieDetails from "./MovieDetails";
const MovieList = function ({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie}>
          <MovieDetails movie={movie} />
        </Movie>
      ))}
    </ul>
  );
};

export default MovieList;
