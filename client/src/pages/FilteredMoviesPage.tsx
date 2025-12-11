import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { translateGenre } from "../utils/translateGenre";
import { useEffect } from "react";
import { Button } from "../ui/Button";
import { fetchMovieWithFilters } from "../store/slices/movieSlice";

export const FilteredMoviesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { filteredMovies, isLoading } = useAppSelector((state) => state.movie);

  const genre = searchParams.get("genre") || "";
  const title = searchParams.get("title") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    const filters: any = {
      page: parseInt(page),
      count: 50,
    };

    if (genre) {
      filters.genre = genre;
    }

    if (title) {
      filters.title = title;
    }

    dispatch(fetchMovieWithFilters(filters))
  }, [genre, title, page, dispatch]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLoadMore = () => {
    const nextPage = parseInt(page) + 1;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", nextPage.toString());
    navigate(`?${newSearchParams.toString()}`);
  };

  const getPageTitle = () => {
    if (genre) {
      return translateGenre(genre);
    }
    if (title) {
      return `Результаты поиска: "${title}"`;
    }
    return "Все фильмы";
  };

  return (
    <section className="filters-page">
      <div className="container">
        <div className="filters-page__wrapper">
          <div className="filters-page__top">
            <button
              className="filters-page__back-icon"
              onClick={handleGoBack}
              type="button"
            >
              <Icon name="icon-back" width={40} height={40} />
            </button>
            <h2 className="filters-page__title">{getPageTitle()}</h2>
          </div>
          {isLoading ? (
            <span className="filters-page__loading">Загрузка фильмов...</span>
          ) : filteredMovies.length > 0 ? (
            <>
              <ul className="filters-page__list">
                {filteredMovies.map((movie, index) => (
                  <li key={index} className="filters-page__item">
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        className="filters-page__img"
                        src={movie.posterUrl}
                        alt="Постер фильма"
                        width={224}
                        height={336}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                text={isLoading ? "Загрузка..." : "Показать еще"}
                disabled={isLoading}
                onClick={handleLoadMore}
              />
            </>
          ) : (
            <span className="filters-page__empty">Фильмы не найдены</span>
          )}
        </div>
      </div>
    </section>
  );
};
