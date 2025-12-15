import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AuthState {
  user: null | {
    email: string;
    name?: string;
    surname?: string;
    favorites?: string[];
  };
  isLoading: boolean;
  error: null | string;
  registerSuccess: boolean;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  isLoading: false,
  error: null,
  registerSuccess: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    credentials: {
      email: string;
      password: string;
      name: string;
      surname: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Не удалось зарегистрироваться");
      }

      return data; //{result: true}
    } catch (error: any) {
      return rejectWithValue(error.message || "Не удалось зарегистрироваться");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Не удалось авторизоваться");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Не удалось авторизоваться");
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось получить данные профиля");
      }

      const userData = await response.json();
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Не удалось получить данные профиля"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось выйти из аккаунта");
      }
      const data = await response.json();
      localStorage.removeItem("user");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Не удалось выйти из аккаунта");
    }
  }
);

export const getFavorites = createAsyncThunk(
  "auth/getFavorites",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const user = state.auth.user;

      if (!user) {
        throw new Error("Необходимо авторизоваться");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/favorites`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось получить избранные фильмы");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Не удалось получить избранные фильмы"
      );
    }
  }
);

export const addToFavorite = createAsyncThunk(
  "auth/addToFavorite",
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const user = state.auth.user;

      if (!user) {
        throw new Error("Необходимо авторизоваться");
      }

      const params = new URLSearchParams();
      params.append("id", id.toString());
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось добавить в избранное");
      }

      const data = await response.json();
      console.log("Response from addToFavorite:", data);

      if (data.result === true) {
        const updatedUser = {
          ...user,
          favorites: [...(user.favorites || []), id.toString()],
        };
        return updatedUser;
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Не удалось добавить в избранное"
      );
    }
  }
);

export const removeFromFavorite = createAsyncThunk(
  "auth/removeFromFavorite",
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const user = state.auth.user;

      if (!user) {
        throw new Error("Необходимо авторизоваться");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/favorites/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось удалить из избранного");
      }

      const data = await response.json();

      if (data.result === true) {
        const updatedUser = {
          ...user,
          favorites: (user.favorites || []).filter(
            (favId) => favId !== id.toString()
          ),
        };
        return updatedUser;
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Не удалось удалить из избранного"
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder

      //REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось зарегистрироваться";
        state.registerSuccess = false;
      })

      //LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.registerSuccess = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Не удалось авторизоваться";
      })

      //GET PROFILE
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось получить данные профиля";
      })

      //LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось выйти из аккаунта";
      })

      //GET FAVORITES
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(action.payload)) {
          // Обрабатываем разные форматы
          const moviesId = action.payload
            .filter((item) => {
              if (!item) return false;

              // Проверяем разные возможные форматы
              if (typeof item === "string") return true;
              if (typeof item === "number") return true;
              if (typeof item === "object" && "id" in item) return true;

              return false;
            })
            .map((item) => {
              // Извлекаем ID в зависимости от формата
              if (typeof item === "string") return item;
              if (typeof item === "number") return item.toString();
              if (typeof item === "object" && "id" in item) {
                const id = item.id;
                return typeof id === "number" ? id.toString() : String(id);
              }
              return "";
            })
            .filter((id) => id); // Убираем пустые строки

          if (state.user) {
            state.user = {
              ...state.user,
              favorites: moviesId,
            };
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        }
      })

      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось загрузить избранные фильмы";
      })

      //ADD TO FAVORITES
      .addCase(addToFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavorite.fulfilled, (state, action) => {
        state.isLoading = false;

        console.log("addToFavorite.fulfilled payload:", action.payload);

        // Проверяем разные форматы ответа
        if (action.payload && typeof action.payload === "object") {
          // Если сервер возвращает объект пользователя
          if (action.payload.email) {
            // Это полный объект пользователя
            state.user = action.payload;
          } else if (action.payload.favorites) {
            // Это объект с favorites
            if (state.user) {
              state.user.favorites = action.payload.favorites;
            }
          } else if (action.payload.result === true) {
            // Это {result: true} - создаем обновленного пользователя
            if (state.user) {
              const id = action.meta.arg; // Берем ID из аргументов thunk
              const updatedFavorites = [
                ...(state.user.favorites || []),
                id.toString(),
              ];
              state.user.favorites = updatedFavorites;
            }
          }
        }

        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось добавить в избранное";
      })

      //REMOVE FROM FAVORITES
      .addCase(removeFromFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromFavorite.fulfilled, (state, action) => {
        state.isLoading = false;


        // Проверяем разные форматы ответа
        if (action.payload && typeof action.payload === "object") {
          // Если сервер возвращает объект пользователя
          if (action.payload.email) {
            // Это полный объект пользователя
            state.user = action.payload;
          } else if (action.payload.favorites) {
            // Это объект с favorites
            if (state.user) {
              state.user.favorites = action.payload.favorites;
            }
          } else if (action.payload.result === true) {
            // Это {result: true} - создаем обновленного пользователя
            if (state.user) {
              const id = action.meta.arg; // Берем ID из аргументов thunk
              const updatedFavorites = (state.user.favorites || []).filter(
                (favId) => favId !== id.toString()
              );
              state.user.favorites = updatedFavorites;
            }
          }
        }

        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(removeFromFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Не удалось удалить из избранных";
      });
  },
});

export const { clearAuthError, clearRegisterSuccess } = authSlice.actions;
export default authSlice.reducer;
