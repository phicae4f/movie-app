import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchRandomMovie } from "../store/slices/movieSlice";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { formatTime } from "../utils/formatTime";
import { Link } from "react-router-dom";
import { FavouriteButton } from "./FavouriteButton";
import { openTrailerModal } from "../store/slices/trailerSlice";

export const HeroSection = () => {

  const dispatch = useAppDispatch();
  const { randomMovie } = useAppSelector((state) => state.movie);

  const handleOpenTrailer = () => {
    if(randomMovie?.trailerYouTubeId && randomMovie.title) {
      dispatch(openTrailerModal({
        title: randomMovie.title,
        youtubeId: randomMovie.trailerYouTubeId
      }))
    }
  }

  useEffect(() => {
    dispatch(fetchRandomMovie());
  }, []);

  const handleFetchRamdonMovie = () => {
    dispatch(fetchRandomMovie());
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero__wrapper">
          <div className="hero__info">
            <ul className="hero__top">
              <li className="hero__top-item">
                <Icon name="icon-star" width={16} height={16} />
                {randomMovie?.tmdbRating}
              </li>
              <li className="hero__top-item">{randomMovie?.releaseYear}</li>
              <li className="hero__top-item">
                {randomMovie?.genres?.join(", ")}
              </li>
              <li className="hero__top-item">
                {formatTime(randomMovie?.runtime)}
              </li>
            </ul>
            <div className="hero__middle">
              <h2 className="hero__title">{randomMovie?.title}</h2>
              <p className="hero__plot">{randomMovie?.plot}</p>
            </div>
            <ul className="hero__bottom">
              <li className="hero__bottom-item">
                <Button type="button" text="Трейлер" onClick={handleOpenTrailer} />
              </li>
              <li className="hero__bottom-item">
                <Link to={`/movie/${randomMovie?.id}`}>
                  <Button
                    className="btn btn--dark"
                    text="О фильме"
                    type="button"
                  />
                </Link>
              </li>
              <li className="hero__bottom-item">
                <FavouriteButton movieId={Number(randomMovie?.id)} />
              </li>
              <li className="hero__bottom-item">
                <button
                  type="button"
                  className="hero__btn"
                  onClick={handleFetchRamdonMovie}
                >
                  <Icon name="icon-repeat" width={24} height={24} />
                </button>
              </li>
            </ul>
          </div>
          <div className="hero__img">
            <img
              src={randomMovie?.posterUrl}
              alt="Постер фильма"
              width={680}
              height={552}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
