import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

  const location = useLocation();
  console.log('ConfigView Location State:', location.state);
  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
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

          <div className={styles['config-option-col']}>
            <span className={styles['option-label']}>
              👁️ Modo Daltonismo
            </span>
            <select
              className={styles['select-input']}
              value={settings.colorBlindMode}
              onChange={(e) => updateSettings({ colorBlindMode: e.target.value as any })}
              aria-label="Seleccionar modo de daltonismo"
            >
              <option value="none">Ninguno</option>
              <option value="protanopia">Protanopia (Rojo)</option>
              <option value="deuteranopia">Deuteranopia (Verde)</option>
              <option value="tritanopia">Tritanopia (Azul)</option>
            </select>
            <div className={styles['color-preview-container']}>
              <p className={styles['preview-title']}>Vista Previa de Colores:</p>
              <div className={styles['preview-grid']}>
                <div className={`${styles['preview-box']} ${styles['preview-success']}`}>
                  <span>Correcto</span>
                </div>
                <div className={`${styles['preview-box']} ${styles['preview-error']}`}>
                  <span>Error</span>
                </div>
                <div className={`${styles['preview-box']} ${styles['preview-primary']}`}>
                  <span>Primario</span>
                </div>
                <div className={`${styles['preview-box']} ${styles['preview-accent']}`}>
                  <span>Acento</span>
                </div>
              </div>
            </div>
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
