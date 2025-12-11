import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { fetchGenres } from "../store/slices/movieSlice";
import { getGenreImage } from "../utils/getImageGenre";
import { translateGenre } from "../utils/translateGenre";

export const GenresPage = () => {
  const { movieGenres } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <section className="genre-page">
      <div className="container">
        <div className="genre-page__wrapper">
          <h2 className="genre-page__title">Жанры фильмов</h2>
          {movieGenres.length !== 0 && (
            <ul className="genre-page__list">
              {movieGenres.map((genre, index) => (
                <li className="genre-page__item" key={index}>
                  <Link to={`/movies?genre=${encodeURIComponent(genre)}`}>
                    <img
                      src={getGenreImage(genre)}
                      alt="Фото альбома"
                      width={290}
                      height={220}
                    />
                    <span className="genre-page__name">
                      {translateGenre(genre)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};
