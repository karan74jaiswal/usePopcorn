import MovieBox from "./MovieBox";
import Summary from "./Summary";

const Main = function ({ movies, watched }) {
  return (
    <main className="main">
      <MovieBox movies={movies} />
      <MovieBox movies={watched}>
        <Summary movies={watched} />
      </MovieBox>
    </main>
  );
};

export default Main;
