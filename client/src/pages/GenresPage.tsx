import { Link } from "react-router-dom";

export const GenresPage = () => {
  return (
    <section className="genre-page">
      <div className="container">
        <div className="genre-page__wrapper">
          <h2 className="genre-page__title">Жанры фильмов</h2>
          <ul className="genre-page__list">
            <li className="genre-page__item">
              <Link to="/">
              <img
                src="/img/desktop/drama-img.jpg"
                alt="Фото альбома"
                width={290}
                height={220}
              />
              <span className="genre-page__name">Драма</span>
              </Link>
            </li>
            <li className="genre-page__item">
              <Link to="/">
              <img
                src="/img/desktop/comedy-img.jpg"
                alt="Фото альбома"
                width={290}
                height={220}
              />
              <span className="genre-page__name">Комедия</span>
              </Link>
            </li>
            <li className="genre-page__item">
              <Link to="/">
              <img
                src="/img/desktop/detective-img.jpg"
                alt="Фото альбома"
                width={290}
                height={220}
              />
              <span className="genre-page__name">Детектив</span>
              </Link>
            </li>
            <li className="genre-page__item">
              <Link to="/">
              <img
                src="/img/desktop/family-img.jpg"
                alt="Фото альбома"
                width={290}
                height={220}
              />
              <span className="genre-page__name">Семейное</span>
              </Link>
            </li>
            <li className="genre-page__item">
              <Link to="/">
              <img
                src="/img/desktop/history-img.jpg"
                alt="Фото альбома"
                width={290}
                height={220}
              />
              <span className="genre-page__name">Историческое</span>
              </Link>
            </li>
            <li className="genre-page__item">
              <Link to="/">
              <img
                src="/img/desktop/thriller-img.jpg"
                alt="Фото альбома"
                width={290}
                height={220}
              />
              <span className="genre-page__name">Триллер</span>
              </Link>
            </li>
            <li className="genre-page__item">
              <Link to="/">
              <img
                src="/img/desktop/fantasy-img.jpg"
                alt="Фото альбома"
                width={290}
                height={220}
              />
              <span className="genre-page__name">Фантастика</span>
              </Link>
            </li>
            <li className="genre-page__item">
              <Link to="/">
              <img
                src="/img/desktop/adventure-img.jpg"
                alt="Фото альбома"
                width={290}
                height={220}
              />
              <span className="genre-page__name">Приключения</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
