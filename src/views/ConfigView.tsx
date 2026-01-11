import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../controllers/AppContext';
import styles from './ConfigView.module.css';

const ConfigView: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();

  useEffect(() => {
    document.title = 'Configuración - Emotion Recognizer';
  }, []);

  const handleToggleTheme = () => {
    updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
  };

  const handleToggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const handleToggleAnimations = () => {
    updateSettings({ animationsEnabled: !settings.animationsEnabled });
  };

  const handleBack = () => {
    navigate('/menu');
  };

  return (
    <div
      className={styles['config-container']}
      role="main"
      aria-label="Pantalla de configuración"
    >
      <header className={styles.header}>
        <button
          className={styles.backButton}
          onClick={handleBack}
          aria-label="Volver"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className={styles.title}>Configuración</h1>
      </header>

      <div className={styles['config-content']}>
        {/* Sección de Apariencia */}
        <div className={styles['config-section']}>
          <h2 className={styles['section-title']}>
            🎨 Apariencia
          </h2>

          <div className={styles['config-option']}>
            <span className={styles['option-label']}>
              🌙 Modo oscuro
            </span>
            <label className={styles['toggle-switch']}>
              <input
                type="checkbox"
                checked={settings.theme === 'dark'}
                onChange={handleToggleTheme}
                aria-label="Activar modo oscuro"
              />
              <span className={styles['toggle-slider']}></span>
            </label>
          </div>

          <div className={styles['config-option']}>
            <span className={styles['option-label']}>
              ✨ Animaciones
            </span>
            <label className={styles['toggle-switch']}>
              <input
                type="checkbox"
                checked={settings.animationsEnabled}
                onChange={handleToggleAnimations}
                aria-label="Activar animaciones"
              />
              <span className={styles['toggle-slider']}></span>
            </label>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* Sección de Sonido */}
        <div className={styles['config-section']}>
          <h2 className={styles['section-title']}>
            🔊 Sonido
          </h2>

          <div className={styles['config-option']}>
            <span className={styles['option-label']}>
              🔔 Efectos de sonido
            </span>
            <label className={styles['toggle-switch']}>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={handleToggleSound}
                aria-label="Activar efectos de sonido"
              />
              <span className={styles['toggle-slider']}></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigView;
