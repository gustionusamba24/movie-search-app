import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    const imgUrl = process.env.REACT_APP_BASEIMGURL;
    return popularMovies.map((movie, id) => {
      return (
        <div className="movie-wrapper" key={id}>
          <div className="movie-title">{movie.title}</div>
          <img
            src={`${imgUrl}/${movie.poster_path}`}
            alt="Movie Poster"
            className="movie-image"
          />
          <div className="movie-date">{movie.release_date}</div>
          <div className="movie-rating">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movinder</h1>
        <input
          type="text"
          placeholder="Cari film favorit anda..."
          className="movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
