import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { openModal } from "./modalSlice";

interface TrailerState {
    isOpen: boolean,
    title: string,
    youtubeId: string
}

const initialState: TrailerState = {
    isOpen: false,
    title: "",
    youtubeId: ""
}

const trailerSlice = createSlice({
    name: "trailer",
    initialState,
    reducers: {
        openTrailerModal: (state, action: PayloadAction<{title: string, youtubeId: string}>) => {
            state.title = action.payload.title
            state.youtubeId = action.payload.youtubeId
            state.isOpen = true
        },
        closeTrailerModal: (state) => {
            state.isOpen = false
            state.title = ""
            state.youtubeId = ""
        }
    }
}
)


export const {closeTrailerModal, openTrailerModal} = trailerSlice.actions
export default trailerSlice.reducer