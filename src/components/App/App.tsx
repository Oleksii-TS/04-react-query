import styles from "./App.module.css";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const results = await fetchMovies(query);

        if (results.length === 0) {
          toast.error(`No movies found for "${query}".`);
        }

        setMovies(results);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Failed to fetch movies. Try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setMovies([]);
    setSelectedMovie(null);
  };

  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster position="top-center" />
    </div>
  );
}
