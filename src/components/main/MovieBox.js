import { useState } from "react";
import Movie from "./Movie";

const MovieBox = function ({ movies, children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <>
          {children || null}
          <ul className="list">
            {movies?.map((movie) => (
              <Movie key={movie.imdbID} movie={movie}>
                {!movie.runtime ? (
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
                  </div>
                )}
              </Movie>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieBox;
