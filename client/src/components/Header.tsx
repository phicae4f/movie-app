import { Link, NavLink } from "react-router-dom";
import { LogoComponent } from "./LogoComponent";
import { SearchBar } from "../ui/SearchBar";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { openModal } from "../store/slices/modalSlice";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(openModal("login"));
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__logo">
            <NavLink to="/" aria-label="Переход на главную страницу">
              <LogoComponent
                width={144}
                height={32}
                imgSrc="/img/desktop/logo-white-img.png"
                imgSrcSet="/img/desktop/logo-white-img@2x.png"
              />
            </NavLink>
          </div>
          <div className="header__middle">
            <ul className="header__list">
              <li className="header__item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Главная
                </NavLink>
              </li>
              <li className="header__item">
                <NavLink
                  to="/genres"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Жанры
                </NavLink>
              </li>
            </ul>
            <div className="header__search-bar">
              <SearchBar placeholder="Поиск" name="search-bar" />
            </div>
          </div>
          <div className="header__right">
            {user ? (
              <Link to="/my-profile"
                className="header__btn"
              >
                {user.surname}
              </Link>
            ) : (
              <button
                className="header__btn"
                type="button"
                onClick={handleLogin}
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
