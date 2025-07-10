import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Movie } from "../../types/movie";
import styles from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  const modalRoot = document.getElementById("modal-root") ?? document.body;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          className={styles.image}
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          }
          alt={movie.title}
        />
        <div className={styles.content}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.overview}>{movie.overview}</p>
          <p className={styles.text}>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className={styles.text}>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
