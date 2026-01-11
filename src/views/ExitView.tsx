import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ExitView.module.css';

const ExitView: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '¡Hasta pronto! - Emotion Recognizer';
  }, []);

  const handleBack = () => {
    navigate('/menu');
  };

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div
      className={styles['exit-container']}
      role="main"
      aria-label="Pantalla de despedida"
    >
      <div className={styles['exit-content']}>
        <div className={styles['exit-icon']} aria-hidden="true">
          👋
        </div>

        <h1 className={styles.title}>¡Gracias por jugar en Emotion Recognizer!</h1>

        <p className={styles.message}>
          Gracias por jugar con Emotion Recognizer. ¡Esperamos verte pronto para seguir aprendiendo sobre emociones!
        </p>

        <div className={styles['buttons-container']}>
          <button
            className={styles['back-button']}
            onClick={handleBack}
            aria-label="Volver a jugar"
          >
            Volver a jugar
          </button>

          <button
            className={styles['restart-link']}
            onClick={handleRestart}
            aria-label="Ir al inicio"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitView;
