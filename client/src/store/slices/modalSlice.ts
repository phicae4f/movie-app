import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ModalType = "login" | "register" | null;

interface ModalState {
  isOpen: boolean;
  modalType: ModalType;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
    },
    switchModal: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload;
    },
  },
});

export const { openModal, closeModal, switchModal } = modalSlice.actions;
export default modalSlice.reducer;
