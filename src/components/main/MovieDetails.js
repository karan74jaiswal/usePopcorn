const MovieDetails = function ({ movie, handleRemoveWatchedMovie }) {
  return !movie.runtime ? (
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  ) : (
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
      <button
        className="btn-delete"
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveWatchedMovie(movie.imdbID);
        }}
      >
        X
      </button>
    </div>
  );
};
export default MovieDetails;
