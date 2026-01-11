import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../controllers/AppContext';
import { badges } from '../models/badgeModel';
import styles from './CollectiblesView.module.css';

function CollectiblesView() {
  const navigate = useNavigate();
  const { collectedBadges } = useApp();

  useEffect(() => {
    document.title = 'Coleccionables - Emozion';
  }, []);

  const handleBack = () => {
    navigate('/menu');
  };

  const handlePlay = () => {
    navigate('/jugar');
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Combinar badges disponibles con los coleccionados
  const allBadges = badges.map(badge => {
    const collected = collectedBadges.find(cb => cb.id === badge.id);
    return collected || badge;
  });

  const collectedCount = collectedBadges.length;
  const totalCount = badges.length;

  return (
    <main
      className={styles.container}
      role="main"
      aria-label="Colección de insignias"
    >
      <header className={styles.header}>
        <button
          className={styles.backButton}
          onClick={handleBack}
          aria-label="Volver al menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className={styles.title}>Coleccionables</h1>
        <div style={{ width: '100px' }} /> {/* Spacer */}
      </header>

      <div className={styles.content}>
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{collectedCount}</span>
            <span className={styles.statLabel}>Obtenidas</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{totalCount}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {Math.round((collectedCount / totalCount) * 100)}%
            </span>
            <span className={styles.statLabel}>Progreso</span>
          </div>
        </div>

        {allBadges.length > 0 ? (
          <div
            className={styles.badgesGrid}
            role="list"
            aria-label="Lista de insignias"
          >
            {allBadges.map((badge) => (
              <article
                key={badge.id}
                className={`${styles.badgeCard} ${!badge.earned ? styles.locked : ''}`}
                role="listitem"
                aria-label={`${badge.name}${badge.earned ? ' - Obtenida' : ' - Bloqueada'}`}
              >
                <div className={styles.badgeIconWrapper}>
                  <span className={styles.badgeIcon} aria-hidden="true">
                    {badge.icon}
                  </span>
                  {!badge.earned && (
                    <span className={styles.lockIcon} aria-hidden="true">🔒</span>
                  )}
                </div>
                <h3 className={styles.badgeName}>{badge.name}</h3>
                <p className={styles.badgeDescription}>{badge.description}</p>
                {badge.earned && badge.earnedDate && (
                  <span className={styles.badgeDate}>
                    {formatDate(badge.earnedDate)}
                  </span>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎮</div>
            <h2 className={styles.emptyTitle}>¡Aún no tienes insignias!</h2>
            <p className={styles.emptyText}>
              Juega para ganar insignias y llenar tu colección.
            </p>
            <button
              className={styles.playButton}
              onClick={handlePlay}
              aria-label="Ir a jugar"
            >
              ¡Jugar ahora!
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default CollectiblesView;
