import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./slices/authSlice";
import  modalSlice  from "./slices/modalSlice";
import  movieSlice  from "./slices/movieSlice";
import  trailerSlice  from "./slices/trailerSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        modal: modalSlice,
        movie: movieSlice,
        trailer: trailerSlice
    }
})

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch