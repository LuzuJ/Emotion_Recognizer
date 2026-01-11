import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../controllers/AppContext';
import { calculateBadges, getNewBadge } from '../models/badgeModel';
import type { Badge } from '../models/types';
import styles from './GameCompletedView.module.css';

interface GameStats {
  score?: number;
  totalRounds?: number;
  maxStreak?: number;
  matchedPairs?: number;
  totalPairs?: number;
  timeSpent: number;
}

function GameCompletedView() {
  const { gameType, difficulty } = useParams<{ gameType: string; difficulty: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { collectedBadges, addBadge } = useApp();

  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const stats = (location.state as GameStats) || {};

  useEffect(() => {
    const gameName = gameType === 'emparejar' ? 'Emparejar' : 'Reconocer';
    document.title = `¡Excelente trabajo! - ${gameName} - Emozion`;

    // Calcular badges (lógica existente mantenida por funcionalidad, aunque visualmente cambiemos)
    if (gameType && difficulty) {
      const badges = calculateBadges({
        gameType: gameType as 'emparejar' | 'reconocer',
        difficulty: difficulty as 'facil' | 'medio' | 'dificil',
        ...stats
      });
      const newBadges = badges.filter(
        badge => !collectedBadges.some(cb => cb.id === badge.id)
      );
      setEarnedBadges(newBadges);
      newBadges.forEach(addBadge);

      const completedBadge = getNewBadge(gameType, difficulty, collectedBadges);
      if (completedBadge && !newBadges.some(b => b.id === completedBadge.id)) {
        setEarnedBadges(prev => [...prev, completedBadge]);
        addBadge(completedBadge);
      }
    }
  }, [gameType, difficulty, stats, collectedBadges, addBadge]);

  const handleHome = () => navigate('/menu');
  const handleRetry = () => navigate(`/advertencia/${gameType}/${difficulty}`);
  const handleNext = () => navigate('/coleccionables'); // O siguiente nivel si hubiera lógica

  // Estrellas basadas en puntaje/aciertos (Simulación: 3 estrellas si completó)
  const starCount = 3;
  const displayBadge = earnedBadges.length > 0 ? earnedBadges[0] : null;

  return (
    <main className={styles.container} role="main">
      <div className={styles.card}>
        <h1 className={styles.title}>¡Excelente trabajo!</h1>

        <section className={styles.rewardsSection}>
          {/* Stars */}
          <div className={styles.starsContainer}>
            {[1, 2, 3].map((s) => (
              <span key={s} className={`${styles.bigStar} ${s <= starCount ? styles.filled : ''}`}>
                ⭐
              </span>
            ))}
          </div>

          <div className={styles.challengeText}>
            ¡Reto Completado!
          </div>

          {/* Badge */}
          {displayBadge && (
            <div className={styles.badgeContainer}>
              <img src={displayBadge.image} alt={displayBadge.name} className={styles.earnedBadgeImage} />
              <div className={styles.badgeName}>{displayBadge.name}</div>
            </div>
          )}
        </section>



        <nav className={styles.navigationButtons}>
          {/* Inicio (Home) - Icon Button */}
          <button
            className={styles.iconButton}
            onClick={handleHome}
            aria-label="Ir al menú principal"
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#4A8B9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className={styles.iconLabel}>Inicio</span>
          </button>

          {/* Jugar de nuevo (Retry) - Icon Button */}
          <button
            className={styles.iconButton}
            onClick={handleRetry}
            aria-label="Jugar de nuevo"
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#4A8B9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            <span className={styles.iconLabel}>Repetir</span>
          </button>

          {/* Continuar - Primary Button */}
          <button
            className={styles.navButtonAction}
            onClick={handleNext}
            aria-label="Continuar"
          >
            Continuar
            <span className={styles.buttonIcon}>➜</span>
          </button>
        </nav>
      </div>
    </main>
  );
}

export default GameCompletedView;
