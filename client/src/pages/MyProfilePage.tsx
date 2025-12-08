import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { getFavorites, logoutUser, removeFromFavorite } from "../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

type ProfileSection = "favorites" | "settings";

interface FavoriteMovie {
  id: number;
  posterUrl: string;
}

export const MyProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [active, setActive] = useState<ProfileSection>("favorites");
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    const loadFavorites = async () => {
      const result = await dispatch(getFavorites());

      if (getFavorites.fulfilled.match(result)) {
        setFavoriteMovies(result.payload);
      }
    };

    loadFavorites();
  }, [dispatch]);

  const handleRemoveFromFavorites = async (id: number) => {
    await dispatch(removeFromFavorite(id))

    window.location.reload();
  }

  const initialsShort =
    [user?.name?.[0], user?.surname?.[0]]
      .filter(Boolean)
      .join("")
      .toUpperCase() || "??";

  return (
    <section className="profile">
      <div className="container">
        <div className="profile__wrapper">
          <h2 className="profile__title">Мой аккаунт</h2>
          <ul className="profile__nav-list">
            <li
              className={`profile__nav-item ${
                active === "favorites" ? "active" : ""
              }`}
            >
              <button type="button" onClick={() => setActive("favorites")}>
                <Icon name="icon-heart" width={24} height={24} />
                Избранные фильмы
              </button>
            </li>
            <li
              className={`profile__nav-item ${
                active === "settings" ? "active" : ""
              }`}
            >
              <button type="button" onClick={() => setActive("settings")}>
                <Icon name="icon-user" width={24} height={24} />
                Настройка аккаунта
              </button>
            </li>
          </ul>
          {active === "favorites" && (
            <ul className="profile__list">
              {favoriteMovies.map((movie, index) => (
                <li key={index} className="profile__item">
                  <button type="button" className="profile__btn-close" onClick={() => handleRemoveFromFavorites(movie.id)}>
                    <Icon name="icon-close" width={15} height={15} />
                  </button>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      className="profile__img"
                      src={movie.posterUrl}
                      alt="Постер фильма"
                      width={224}
                      height={336}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {active === "settings" && (
            <div className="profile__info">
              <div className="profile__info-wrapper">
                <div className="profile__info-icon">{initialsShort}</div>
                <div className="profile__info-username-wrapper">
                  <span className="profile__info-label">Имя Фамилия</span>
                  <span className="profile__info-value">
                    {user?.name} {user?.surname}
                  </span>
                </div>
              </div>
              <div className="profile__info-wrapper">
                <div className="profile__info-icon">
                  <Icon name="icon-email" width={24} height={24} />
                </div>
                <div className="profile__info-username-wrapper">
                  <span className="profile__info-label">Электронная почта</span>
                  <span className="profile__info-value">{user?.email}</span>
                </div>
              </div>
              <Button
                type="button"
                text="Выйти из аккаунта"
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
