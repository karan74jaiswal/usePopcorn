const Movie = function ({ movie, children }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      {children}
    </li>
  );
};

export default Movie;
