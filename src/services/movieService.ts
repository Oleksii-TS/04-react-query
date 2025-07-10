import axios from "axios";
import { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
}

const API_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(query: string): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const config = {
    params: { query },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<MoviesHttpResponse>(API_URL, config);
  return response.data.results;
}
