import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  releaseYear: number;
  releaseDate: string;
  genres: string[];
  plot: string;
  runtime: number;
  budget: string;
  revenue: string;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerYouTubeId: string;
  tmdbRating: number;
  searchL: string;
  keywords: string[];
  countriesOfOrigin: string[];
  languages: string[];
  cast: string[];
  director: string;
  production: string;
  awardsSummary: string;
}

interface MovieFilters {
  count?: number;
  page?: number;
  title?: string;
  genre?: string;
}

interface MovieState {
  randomMovie: Movie | null;
  topMovies: Movie[];
  currentMovie: Movie | null;
  movieGenres: string[] | [];
  filteredMovies: Movie[],
  currentFilters: MovieFilters | null,
  totalMoviesCount: number,
  currentPage: number,
  hasMore: boolean,
  isLoading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  randomMovie: null,
  topMovies: [],
  currentMovie: null,
  movieGenres: [],
  filteredMovies: [],
  currentFilters: null,
  totalMoviesCount: 0,
  currentPage: 1,
  hasMore: true,
  isLoading: false,
  error: null,
};

export const fetchRandomMovie = createAsyncThunk(
  "movie/fetchRandomMovie",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/movie/random`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось загрузить фильм");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Не удалось загрузить фильм");
    }
  }
);

export const fetchTopMovies = createAsyncThunk(
  "movie/fetchTopMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/movie/top10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось загрузить фильмы");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Не удалось загрузить фильмы");
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  "movie/fetchMovieById",
  async (movieId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/movie/${movieId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось загрузить фильм");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Не удалось загрузить фильм");
    }
  }
);

export const fetchGenres = createAsyncThunk(
  "movie/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/movie/genres`
      );

      if (!response.ok) {
        throw new Error("Не удалось загрузить жанры");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Не удалось загрузить жанры");
    }
  }
);

export const fetchMovieWithFilters = createAsyncThunk(
  "movie/fetchMovieWithFilters",
  async (filters: MovieFilters, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();

      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.title) queryParams.append("title", filters.title);
      if (filters.genre) queryParams.append("genre", filters.genre);
      if (filters.count) queryParams.append("count", filters.count.toString());

      const queryString = queryParams.toString();

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/movie${
          queryString ? `?${queryString}` : ""
        }`
      );

      if(!response.ok) {
        throw new Error("Не удалось найти фильм")
      }
      const data = await response.json()
      console.log(data)
      return data
    } catch (error: any) {
      return rejectWithValue(error.message || "Не удалось найти фильм");
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearRandomMovie: (state) => {
      state.randomMovie = null;
    },
    clearMovieError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //FETCH RANDOM MOVIE
      .addCase(fetchRandomMovie.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRandomMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.randomMovie = action.payload;
      })
      .addCase(fetchRandomMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось загрузить фильм";
      })

      //FETCH TOP10 MOVIE
      .addCase(fetchTopMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTopMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topMovies = action.payload;
      })
      .addCase(fetchTopMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось загрузить фильмы";
      })

      //FETCH MOVIE BY ID
      .addCase(fetchMovieById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось загрузить фильм";
      })

      //FETCH GENRES
      .addCase(fetchGenres.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieGenres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось загрузить жанры";
      })

      //FETCH MOVIES WITH FILTERS
      .addCase(fetchMovieWithFilters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieWithFilters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredMovies = action.payload;
        state.totalMoviesCount = action.payload.length
        state.hasMore = action.payload && action.payload.length > 0
      })
      .addCase(fetchMovieWithFilters.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось загрузить фильмы";
      });
  },
});

export const { clearMovieError, clearRandomMovie } = movieSlice.actions;
export default movieSlice.reducer;
