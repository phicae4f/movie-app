import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { fetchTopMovies } from "../store/slices/movieSlice";

export const TopFilmsSection = () => {
  const dispatch = useAppDispatch();
  const { topMovies } = useAppSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchTopMovies());
  }, [dispatch]);

  if (topMovies.length === 0) {
    return (
      <section className="top-films">
        <div className="container">
          <div className="top-films__wrapper">
            <h2 className="top-films__empty">Фильмы отсутствуют</h2>
          </div>
        </div>                                                                                                                                       
      </section>
    );
  }

  return (
    <section className="top-films">
      <div className="container">
        <div className="top-films__wrapper">
          <h2 className="top-films__title">Топ 10 фильмов</h2>
          <ul className="top-films__list">
            {topMovies.map((movie, index) => (
              <li key={index} className="top-films__item">
                <span className="top-films__index">{index + 1}</span>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    className="top-films__img"
                    src={movie.posterUrl}
                    alt="Постер фильма"
                    width={224}
                    height={336}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
