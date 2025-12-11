import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { closeTrailerModal } from "../store/slices/trailerSlice";
import { TrailerModal } from "./TrailerModal";

export const TrailerContainer = () => {
  const dispatch = useAppDispatch();
  const { isOpen, title, youtubeId } = useAppSelector((state) => state.trailer);

  const handleClose = () => {
    dispatch(closeTrailerModal());
  };

  return (
    <TrailerModal
      isOpen={isOpen}
      title={title}
      youtubeId={youtubeId}
      onClose={handleClose}
    />
  );
};
