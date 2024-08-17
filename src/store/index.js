import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

// Helper function for fetch movies action***************************************************************************
// taking the raw movies array and creating 1. genres array for each movies and 2. create that movie element and push in movies array
const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      const movieElement = {
        id: movie.id,
        name: movie.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      };
      moviesArray.push(movieElement);
    }
  });
};
// getting the movies data from api
const getRawData = async (api, genres, paging) => {
  const moviesArray = []; //we are taking max 60 movies
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

// These are the action creater functions************************************************************************************

export const getGenres = createAsyncThunk(
  "netflix/genres", //<---- type of action
  async () => {
    //<---- payload creater function
    const {
      data: { genres },
    } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
  }
);

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    // arguments are from passed where it dispatched
    const {
      netflix: { genres },
    } = thunkApi.getState(); // if i need the current state for action then i can get that by using thunkApi.getstate()
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "netflix/moviesByGenres", //<---- type of action
  async ({ genre, type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

export const getUserLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios
      .get(`http://localhost:5000/api/user/liked/${email}`)
      .catch((err) => {
        console.log(err);
      });
    return movies;
  }
);

export const removeFromLikedMovies = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ email, movieId }) => {
    const {
      data: { movies },
    } = await axios
      .put(`http://localhost:5000/api/user/delete`, { email, movieId })
      .catch((err) => {
        console.log(err);
      });
    return movies;
  }
);

// this function select the state add the action and then update the state********************************************

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    //initial state + action => final state
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
