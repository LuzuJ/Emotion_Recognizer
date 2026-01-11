import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DifficultyModal from '../components/DifficultyModal';
import styles from './GameSelectView.module.css';

const GameSelectView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<'emparejar' | 'reconocer' | null>(null);

  useEffect(() => {
    document.title = 'Seleccionar Juego - Emotion Recognizer';
  }, []);

  const handleGameClick = (game: 'emparejar' | 'reconocer') => {
    setSelectedGame(game);
    navigate(`/dificultad/${game}`);
  };

  const handleBack = () => {
    navigate('/menu');
  };

  function handleCloseModal(): void {
    throw new Error('Function not implemented.');
  }

  function handleStartGame(_difficulty: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className={styles.container}>
      {/* Background Elements */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>

      <header className={styles.header}>
        <button
          className={styles.backButton}
          onClick={handleBack}
          aria-label="Volver al menú"
        >
          {/* Circular arrow icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>

        <img src="/logo-emotion.png" alt="Emotion Recognizer Logo" className={styles.headerLogo} />

        <button
          className={styles.settingsButton}
          onClick={() => navigate('/configuracion', { state: { from: '/jugar' } })}
          aria-label="Configuración"
        >
          <img src="/icons/configuracion.svg" alt="" style={{ width: '24px', height: '24px' }} />
        </button>
      </header>

      <div className={styles.content}>
        <h1 className={styles.title}>¿A qué quieres jugar?</h1>

        <div className={styles.gamesContainer}>
          {/* Juego de Emparejar */}
          <button
            className={styles.gameCard}
            onClick={() => handleGameClick('emparejar')}
            aria-label="Jugar a emparejar emociones"
          >
            <div className={styles.gamePreview}>
              <div className={styles.previewCards}>
                <div className={styles.previewCard}>
                  <span className={styles.questionMark}>?</span>
                </div>
                <div className={`${styles.previewCard} ${styles.flipped}`}>
                  <img src="/emotions/feliz.svg" alt="" aria-hidden="true" />
                </div>
                <div className={`${styles.previewCard} ${styles.flipped}`}>
                  <img src="/emotions/feliz.svg" alt="" aria-hidden="true" />
                </div>
                <div className={styles.previewCard}>
                  <span className={styles.questionMark}>?</span>
                </div>
              </div>
            </div>
            <h2 className={styles.gameTitle}>Emparejar</h2>
            <p className={styles.gameDescription}>
              Encuentra las parejas de emociones iguales volteando las cartas
            </p>
          </button>

          {/* Juego de Reconocer */}
          <button
            className={styles.gameCard}
            onClick={() => handleGameClick('reconocer')}
            aria-label="Jugar a reconocer emociones"
          >
            <div className={styles.gamePreview}>
              <div className={styles.recognitionPreview}>
                <img
                  src="/emotions/triste.svg"
                  alt=""
                  aria-hidden="true"
                  className={styles.recognitionImage}
                />
                <div className={styles.tagsContainer}>
                  <span className={styles.tag}>Feliz</span>
                  <span className={`${styles.tag} ${styles.tagActive}`}>Triste</span>
                  <span className={styles.tag}>Enojado</span>
                </div>
              </div>
            </div>
            <h2 className={styles.gameTitle}>Reconocer</h2>
            <p className={styles.gameDescription}>
              Identifica la emoción correcta observando la expresión facial
            </p>
          </button>
        </div>
      </div>

      {/* Render Difficulty Modal if a game is selected */}
      {selectedGame && (
        <DifficultyModal
          gameType={selectedGame}
          onClose={handleCloseModal}
          onStart={handleStartGame}
        />
      )}
    </div>
  );
};

export default GameSelectView;
