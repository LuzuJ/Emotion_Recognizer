import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './DifficultySelectView.module.css';

const DifficultySelectView: React.FC = () => {
  const navigate = useNavigate();
  const { gameType } = useParams<{ gameType: string }>();

  const isEmparejar = gameType === 'emparejar';
  const gameName = isEmparejar ? 'Emparejar' : 'Reconocer';


  useEffect(() => {
    document.title = `Dificultad - ${gameName} - Emotion Recognizer`;
  }, [gameName]);

  const handleSelectDifficulty = (difficulty: string) => {
    navigate(`/advertencia/${gameType}/${difficulty}`);
  };

  const handleTutorial = () => {
    navigate(`/tutorial/${gameType}`);
  };

  const handleBack = () => {
    navigate('/jugar');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleConfig = () => {
    navigate('/configuracion');
  };

  return (
    <div className={styles.container} role="main">
      <header className={styles.header}>
        <button className={styles.navButton} onClick={handleBack} aria-label="Volver">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className={styles.titleBox}>
          <h1 className={styles.pageTitle}>Dificultad</h1>
        </div>

        {/* Placeholder to balance header if needed, or empty */}
        <div style={{ width: 60 }}></div>
      </header>

      <div className={styles.contentGrid}>
        {/* Left Column: Preview */}
        <div className={styles.previewColumn}>
          <div className={styles.previewHeader}>{gameName.toUpperCase()}</div>
          <div className={styles.previewBody}>
            {isEmparejar ? (
              <div className={styles.emparejarGrid}>
                <div className={styles.cardExample}>?</div>
                <div className={styles.cardExample}><img src="/emotions/feliz.svg" alt="Feliz" /></div>
                <div className={styles.cardExample}>?</div>
                <div className={styles.cardExample}><img src="/emotions/feliz.svg" alt="Feliz" /></div>
                <div className={styles.cardExample}>?</div>
                <div className={styles.cardExample}>?</div>
              </div>
            ) : (
              <div className={styles.reconocerPreview}>
                <img src="/emotions/triste.svg" alt="Triste" style={{ width: 80, marginBottom: 10 }} />
                <div className={styles.tagsRow}>
                  <span className={styles.tag}>Feliz</span>
                  <span className={`${styles.tag} ${styles.active}`}>Triste</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Buttons */}
        <div className={styles.buttonsColumn}>
          <button className={`${styles.diffButton} ${styles.easy}`} onClick={() => handleSelectDifficulty('facil')}>
            Fácil
          </button>
          <button className={`${styles.diffButton} ${styles.medium}`} onClick={() => handleSelectDifficulty('medio')}>
            Medio
          </button>
          <button className={`${styles.diffButton} ${styles.hard}`} onClick={() => handleSelectDifficulty('dificil')}>
            Difícil
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        {/* Tutorial Button (Left) */}
        <button className={styles.iconButton} onClick={handleTutorial}>
          {/* Question Mark SVG */}
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" stroke="#4A8B9F" strokeWidth="3" fill="none" />
            <text x="30" y="40" textAnchor="middle" fontSize="35" fontWeight="bold" fill="#4A8B9F" fontFamily="Arial">?</text>
          </svg>
          <span className={styles.iconLabel}>Tutorial</span>
        </button>

        {/* Home Button (Center) */}
        <button className={styles.iconButton} onClick={handleHome}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#4A8B9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className={styles.iconLabel}>Inicio</span>
        </button>

        {/* Config Button (Right) */}
        <button className={styles.iconButton} onClick={handleConfig}>
          <img src="/icons/configuracion.svg" alt="" className={styles.iconImage} />
          <span className={styles.iconLabel}>Configuración</span>
        </button>
      </div>
    </div>
  );
};

export default DifficultySelectView;
