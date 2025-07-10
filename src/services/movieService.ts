import axios from "axios";
import { Movie } from "../types/movie";

export interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

const API_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(
  query: string,
  page: number
): Promise<MoviesHttpResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const config = {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<MoviesHttpResponse>(API_URL, config);
  return response.data;
}
