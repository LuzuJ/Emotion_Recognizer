import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './GameWarningView.module.css';

const GameWarningView: React.FC = () => {
  const navigate = useNavigate();
  const { gameType, difficulty } = useParams<{ gameType: string; difficulty: string }>();

  const isEmparejar = gameType === 'emparejar';
  const gameName = isEmparejar ? 'Emparejar' : 'Reconocer';

  const difficultyInfo = {
    facil: { name: 'Fácil', emotions: 5, icon: '🟢' },
    medio: { name: 'Medio', emotions: 10, icon: '🟡' },
    dificil: { name: 'Difícil', emotions: 15, icon: '🔴' }
  };

  const currentDifficulty = difficultyInfo[difficulty as keyof typeof difficultyInfo] || difficultyInfo.facil;

  useEffect(() => {
    document.title = `¡Listo para jugar! - Emotion Recognizer`;
  }, []);

  const handleStartGame = () => {
    navigate(`/juego/${gameType}/${difficulty}`);
  };

  const handleBack = () => {
    navigate(`/dificultad/${gameType}`);
  };

  return (
    <div
      className={styles['warning-container']}
      role="main"
      aria-label="Información antes de comenzar el juego"
    >
      <div className={styles['warning-content']}>
        <div className={styles['warning-icon']} aria-hidden="true">
          🎮
        </div>

        <h1 className={styles.title}>¡Listo para jugar!</h1>

        <p className={styles.description}>
          {isEmparejar
            ? 'Vas a buscar parejas de emociones. Voltea las cartas y encuentra las que son iguales.'
            : 'Vas a ver diferentes emociones. Selecciona el nombre correcto para cada una.'}
        </p>

        <div className={styles['info-box']}>
          <h2 className={styles['info-title']}>Tu juego:</h2>
          <div className={styles['info-details']}>
            <div className={styles['info-item']}>
              <span>🎯 Juego:</span>
              <strong>{gameName}</strong>
            </div>
            <div className={styles['info-item']}>
              <span>{currentDifficulty.icon} Dificultad:</span>
              <strong>{currentDifficulty.name}</strong>
            </div>
            <div className={styles['info-item']}>
              <span>😊 Emociones:</span>
              <strong>{currentDifficulty.emotions}</strong>
            </div>
          </div>
        </div>

        <div className={styles['buttons-container']}>
          <button
            className={styles['start-button']}
            onClick={handleStartGame}
            aria-label="Comenzar el juego"
          >
            ¡Empezar!
          </button>

          <button
            className={styles['back-button']}
            onClick={handleBack}
            aria-label="Volver a selección de dificultad"
          >
            ← Cambiar dificultad
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameWarningView;
