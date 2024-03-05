const Movie = function ({ movie, children, handleSelectedID }) {
  return (
    <li onClick={() => handleSelectedID(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      {children}
    </li>
  );
};

export default Movie;
