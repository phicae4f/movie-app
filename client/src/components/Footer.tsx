import { Icon } from "../ui/Icon";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <ul className="footer__list">
            <li className="footer__item">
              <a href="#" target="_blank" aria-label="Вконтакте">
                <Icon name="icon-vk" width={36} height={36} />
              </a>
            </li>
            <li className="footer__item">
              <a href="#" target="_blank" aria-label="Вконтакте">
                <Icon name="icon-youtube" width={36} height={36} />
              </a>
            </li>
            <li className="footer__item">
              <a href="#" target="_blank" aria-label="Вконтакте">
                <Icon name="icon-ok" width={36} height={36} />
              </a>
            </li>
            <li className="footer__item">
              <a href="#" target="_blank" aria-label="Вконтакте">
                <Icon name="icon-tg" width={36} height={36} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
