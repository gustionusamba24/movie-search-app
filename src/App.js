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
    return popularMovies.map((movies, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movies.title}</div>
          <img
            src={`${imgUrl}/${movies.poster_path}`}
            alt="Movie Poster"
            className="movie-image"
          />
          <div className="movie-date">{movies.release_date}</div>
          <div className="movie-rating">{movies.vote_average}</div>
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
