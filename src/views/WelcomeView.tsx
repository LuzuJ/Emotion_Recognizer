import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import styles from './WelcomeView.module.css';

const WelcomeView: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Anunciar la pantalla para lectores de pantalla
    document.title = 'Bienvenido a Emotion Recognizer - Reconocedor de Emociones';
  }, []);

  const handleStart = () => {
    navigate('/menu');
  };

  const handleTestEmotions = () => {
    navigate('/test-emotions');
  };

  return (
    <div className={styles['welcome-container']} role="main" aria-label="Pantalla de bienvenida">
      <div className={styles['welcome-content']}>
        <div className={styles['logo-container']}>
          <img
            src="/logo-emotion.png"
            alt="Emotion Recognizer - Logo del proyecto"
            className={styles.logo}
          />
        </div>

        <h1 className={styles['welcome-title']}>
          Bienvenido a Emotion Recognizer
        </h1>

        <p className={styles['welcome-subtitle']}>
          Aprende a reconocer emociones de manera divertida
        </p>

        <div className={styles['button-group']}>
          <Button
            variant="primary"
            size="large"
            onClick={handleStart}
            ariaLabel="Comenzar a jugar"
          >
            Comenzar
          </Button>

          <Button
            variant="secondary"
            size="large"
            onClick={handleTestEmotions}
            ariaLabel="Ver todas las emociones"
          >
            Ver Emociones
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
