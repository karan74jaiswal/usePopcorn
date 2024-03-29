const Summary = function ({ movies }) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const avgImdbRating = average(movies.map((movie) => +movie.imdbRating || 0));
  const avgUserRating = average(movies.map((movie) => movie.userRating));
  const avgRuntime = average(movies.map((movie) => +movie.runtime || 0));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{movies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{Number(avgImdbRating).toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Number(avgUserRating).toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};
export default Summary;
