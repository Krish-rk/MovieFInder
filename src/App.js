// src/App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import { TailSpin } from "react-loader-spinner";
import "./index.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const moviesPerPage = 60;

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      const data = await response.json();
      setMovies(data.docs);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="container">
      <Navbar onSearch={fetchMovies} />
      {loading ? (
        <div className="loader">
          <TailSpin color="#007bff" height={80} width={80} />
        </div>
      ) : (
        <>
          <div className="movie-cards">
            {currentMovies.map((movie) => (
              <MovieCard key={movie.key} movie={movie} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
