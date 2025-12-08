import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./slices/authSlice";
import  modalSlice  from "./slices/modalSlice";
import  movieSlice  from "./slices/movieSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        modal: modalSlice,
        movie: movieSlice
    }
})

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch