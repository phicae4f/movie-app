import { useEffect, useRef, useState } from "react";
import { Icon } from "../ui/Icon";
import { createPortal } from "react-dom";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  youtubeId: string;
}

export const TrailerModal = ({
  isOpen,
  onClose,
  title,
  youtubeId,
}: TrailerModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Обработка закрытия по ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Блокируем скролл

      setIsPlaying(true);
      setIsHovered(false);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Обработчики для YouTube API
  const handlePlay = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
      setIsPlaying(false);
    }
  };

  // Клик вне модалки
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&enablejsapi=1`;
  return createPortal(
    <div
      className="trailer-modal__backdrop"
      onClick={handleBackdropClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="trailer-modal__video-wrapper">
        <iframe
          ref={iframeRef}
          className="trailer-modal__video"
          src={youtubeUrl}
          title={`Трейлер: ${title}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="trailer-modal__title">{title}</div>
        <button
          className="trailer-modal__btn-close"
          type="button"
          onClick={onClose}
        >
          <Icon name="icon-close" width={24} height={24} />
        </button>
        {(isPlaying || isHovered) && (
          <button
            className="trailer-modal__btn-control pause"
            type="button"
            onClick={handlePause}
          >
            <Icon name="icon-pause" width={40} height={40} />
          </button>
        )}
        {!isPlaying && isHovered && (
          <button
            className="trailer-modal__btn-control play"
            type="button"
            onClick={handlePlay}
          >
            <Icon name="icon-play" width={40} height={40} />
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};
