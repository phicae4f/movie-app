import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { closeModal, switchModal } from "../store/slices/modalSlice";
import { AuthComponent } from "./AuthComponent";

export const ModalContainer = () => {
  const dispatch = useAppDispatch();
  const { isOpen, modalType } = useAppSelector((state) => state.modal);

  if (!isOpen || !modalType) {
    return null;
  }

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSwitchMode = () => {
    const newMode = modalType === "login" ? "register" : "login";
    dispatch(switchModal(newMode));
  };

  return (
    <div onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <AuthComponent
          mode={modalType}
          onClose={handleClose}
          onSwitchMode={handleSwitchMode}
        />
      </div>
    </div>
  );
};
