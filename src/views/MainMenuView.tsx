import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import styles from './MainMenuView.module.css';

const MainMenuView: React.FC = () => {
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    document.title = 'Menú Principal - Emotion Recognizer';
  }, []);

  const handlePlay = () => navigate('/jugar');
  const handleCollections = () => navigate('/coleccionables');
  const handleSettings = () => navigate('/configuracion');
  const handleExit = () => setShowExitModal(true);
  const confirmExit = () => navigate('/salir');
  const cancelExit = () => setShowExitModal(false);

  return (
    <div className={styles.container} role="main">

      {/* Center Column */}
      <div className={styles.centerColumn}>
        <div className={styles.logoContainer}>
          <img
            src="/logo-emozion.png"
            alt="Emotion Recognizer Logo"
            className={styles.logo}
          />
        </div>

        <h1 className={styles.welcomeText}>¡Bienvenido!</h1>

        <div className={styles.buttonGroup}>
          <Button
            className={styles.playButton}
            onClick={handlePlay}
            ariaLabel="Jugar"
            size="large"
          >
            Jugar
          </Button>

          <Button
            className={styles.exitButton}
            onClick={handleExit}
            ariaLabel="Salir"
            variant="secondary"
          >
            Salir
          </Button>
        </div>
      </div>

      {/* Right Side Icons */}
      <button
        className={styles.collectionsIcon}
        onClick={handleCollections}
        aria-label="Colecciones"
      >
        <img src="/icons/colecciones.svg" alt="" className={styles.iconImage} />
        <span className={styles.iconLabel}>Colecciones</span>
      </button>

      <button
        className={styles.settingsIcon}
        onClick={handleSettings}
        aria-label="Configuración"
      >
        <img src="/icons/configuracion.svg" alt="" className={styles.iconImage} />
        <span className={styles.iconLabel}>Configuración</span>
      </button>

      {/* Exit Modal */}
      {showExitModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>¿Estás seguro que deseas salir del juego?</h2>
            <div className={styles.modalButtons}>
              <Button onClick={cancelExit} className={styles.modalCancel} variant="secondary">No</Button>
              <Button onClick={confirmExit} className={styles.modalConfirm}>Si</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenuView;
