import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addToFavorite, removeFromFavorite } from "../store/slices/authSlice";
import { openModal } from "../store/slices/modalSlice";
import { Icon } from "../ui/Icon";

interface FavouriteButtonProps {
    movieId: number
}

export const FavouriteButton = ({movieId}: FavouriteButtonProps) => {
    const {user} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const movieIdStr = movieId.toString()
    const isFavorite = user?.favorites?.includes(movieIdStr) || false

    const toggleFavourite = async () => {
        if(!user) {
            dispatch(openModal("login"))
            return
        }

        if (!movieId) {
            console.error("movieId is undefined");
            return;
        }
        
        if(isFavorite) {
            await dispatch(removeFromFavorite(movieId))
        } else {
            await dispatch(addToFavorite(movieId))
        }
    }

    return (
        <button
            type="button"
            className={`btn btn--dark btn--favorite ${isFavorite ? "filled" : ""}`}
            onClick={toggleFavourite}
        >
            <Icon name="icon-heart" width={24} height={24} />
        </button>
    );
};