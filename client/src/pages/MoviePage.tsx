import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { fetchMovieById } from "../store/slices/movieSlice";
import { Icon } from "../ui/Icon";
import { formatTime } from "../utils/formatTime";
import { Button } from "../ui/Button";
import { FavouriteButton } from "../components/FavouriteButton";

export const MoviePage = () => {
  const { id } = useParams();
  const { currentMovie } = useAppSelector((state) => state.movie);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(Number(id)));
    }
  }, [dispatch]);
  return (
    <section className="movie-page">
      <div className="container">
        <div className="movie-page__wrapper">
          <div className="movie-page__hero">
            <div className="movie-page__info">
              <ul className="movie-page__top">
                <li className="movie-page__top-item">
                  <Icon name="icon-star" width={16} height={16} />
                  {currentMovie?.tmdbRating}
                </li>
                <li className="movie-page__top-item">
                  {currentMovie?.releaseYear}
                </li>
                <li className="movie-page__top-item">
                  {currentMovie?.genres?.join(", ")}
                </li>
                <li className="movie-page__top-item">
                  {formatTime(currentMovie?.runtime)}
                </li>
              </ul>
              <div className="movie-page__middle">
                <h2 className="movie-page__title">{currentMovie?.title}</h2>
                <p className="movie-page__plot">{currentMovie?.plot}</p>
              </div>
              <ul className="movie-page__bottom">
                <li className="movie-page__bottom-item">
                  <Button type="button" text="Трейлер" />
                </li>
                <li className="movie-page__bottom-item">
                  <FavouriteButton movieId={Number(currentMovie?.id)} />
                </li>
              </ul>
            </div>
            <div className="movie-page__img">
              <img
                src={currentMovie?.posterUrl}
                alt="Постер фильма"
                width={680}
                height={552}
              />
            </div>
          </div>
          <div className="movie-page__details">
            <h2 className="movie-page__details-title">О фильме</h2>
            <ul className="movie-page__details-list">
              <li className="movie-page__details-item">
                <span className="movie-page__details-variable">
                  Язык оригинала
                </span>
                <span className="movie-page__details-space"></span>
                <span className="movie-page__details-value">
                  {currentMovie?.language.toUpperCase()}
                </span>
              </li>
              <li className="movie-page__details-item">
                <span className="movie-page__details-variable">Бюджет</span>
                <span className="movie-page__details-space"></span>
                <span className="movie-page__details-value">{`${
                  currentMovie?.budget === null
                    ? "Нет информации"
                    : `${currentMovie?.budget} руб.`
                }`}</span>
              </li>
              <li className="movie-page__details-item">
                <span className="movie-page__details-variable">Выручка</span>
                <span className="movie-page__details-space"></span>
                <span className="movie-page__details-value">{`${
                  currentMovie?.revenue === null
                    ? "Нет информации"
                    : `${currentMovie?.revenue} руб.`
                }`}</span>
              </li>

              <li className="movie-page__details-item">
                <span className="movie-page__details-variable">Режиссёр</span>
                <span className="movie-page__details-space"></span>
                <span className="movie-page__details-value">{`${
                  currentMovie?.director === null
                    ? "Нет информации"
                    : `${currentMovie?.director}`
                }`}</span>
              </li>
              <li className="movie-page__details-item">
                <span className="movie-page__details-variable">Продакшен</span>
                <span className="movie-page__details-space"></span>
                <span className="movie-page__details-value">{`${
                  currentMovie?.production === null
                    ? "Нет информации"
                    : `${currentMovie?.production}`
                }`}</span>
              </li>
              <li className="movie-page__details-item">
                <span className="movie-page__details-variable">Награды</span>
                <span className="movie-page__details-space"></span>
                <span className="movie-page__details-value">{`${
                  currentMovie?.awardsSummary === null
                    ? "Нет информации"
                    : `${currentMovie?.awardsSummary}`
                }`}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
