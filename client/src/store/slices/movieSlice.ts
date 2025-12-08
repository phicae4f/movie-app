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

interface MovieState {
  randomMovie: Movie | null;
  topMovies: Movie[];
  currentMovie: Movie | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  randomMovie: null,
  topMovies: [],
  currentMovie: null,
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
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/movie/${movieId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

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
        state.currentMovie = action.payload
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось загрузить фильм";
      });
  },
});

export const { clearMovieError, clearRandomMovie } = movieSlice.actions;
export default movieSlice.reducer;
