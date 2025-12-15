import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogoComponent } from "./LogoComponent";
import { SearchBar } from "../ui/SearchBar";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { openModal } from "../store/slices/modalSlice";
import { Icon } from "../ui/Icon";
import { useEffect, useRef, useState } from "react";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleOpenSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogin = () => {
    dispatch(openModal("login"));
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/movies?title=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__logo">
            <NavLink to="/" aria-label="Переход на главную страницу">
              <LogoComponent
                width={144}
                height={32}
                mobileSrc="/img/mobile/logo-white-img.png"
                mobileSrc2x="/img/mobile/logo-white-img@2x.png"
                desktopSrc="/img/desktop/logo-white-img.png"
                desktopSrc2x="/img/desktop/logo-white-img@2x.png"
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
                  <span>Жанры</span>
                  <Icon name="icon-genre" width={24} height={24} />
                </NavLink>
              </li>
            </ul>
            <div className={`header__search-bar ${isSearchOpen ? "open" : ""}`}>
              <SearchBar
                onSubmit={handleSearch}
                placeholder="Поиск"
                name="search-bar"
              />
              <button
              className="header__btn-toggle"
                onClick={handleOpenSearch}
                type="button"
                aria-label={`${
                  isSearchOpen ? "Закрыть поиск" : "Открыть поиск"
                }`}
              >
                <Icon name="icon-search" width={24} height={24} />
              </button>
            </div>
          </div>
          <div className="header__right">
            {user ? (
              <Link to="/my-profile" className="header__btn">
                {user.surname}
              </Link>
            ) : (
              <button
                className="header__btn"
                type="button"
                onClick={handleLogin}
              >
                <Icon name="icon-user" width={24} height={24} />
                <span>Войти</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
