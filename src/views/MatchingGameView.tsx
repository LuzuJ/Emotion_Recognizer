import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmotionsByDifficulty } from '../models/emotionModel';
import type { Emotion } from '../models/types';
import styles from './MatchingGameView.module.css';

interface Card {
  id: number;
  emotion: Emotion;
  isFlipped: boolean;
  isMatched: boolean;
}

function MatchingGameView() {
  const { difficulty } = useParams<{ difficulty: string }>();
  const navigate = useNavigate();

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [startTime] = useState<Date>(new Date());

  const totalPairs = useRef(0);

  // Inicializar juego
  useEffect(() => {
    const emotions = getEmotionsByDifficulty(difficulty as 'facil' | 'medio' | 'dificil');
    totalPairs.current = emotions.length;

    // Crear pares de cartas
    const cardPairs: Card[] = [];
    emotions.forEach((emotion, index) => {
      // Añadir dos cartas por cada emoción
      cardPairs.push({
        id: index * 2,
        emotion,
        isFlipped: false,
        isMatched: false
      });
      cardPairs.push({
        id: index * 2 + 1,
        emotion,
        isFlipped: false,
        isMatched: false
      });
    });

    // Mezclar cartas (Fisher-Yates)
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }

    setCards(cardPairs);
    document.title = `Emparejar - ${difficulty} - Emotion Recognizer`;
  }, [difficulty]);

  // Verificar si el juego terminó
  useEffect(() => {
    if (matchedPairs > 0 && matchedPairs === totalPairs.current) {
      const endTime = new Date();
      const timeSpent = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

      // Esperar un momento antes de navegar
      setTimeout(() => {
        navigate(`/completado/emparejar/${difficulty}`, {
          state: {
            attempts,
            timeSpent,
            matchedPairs,
            totalPairs: totalPairs.current
          }
        });
      }, 1500);
    }
  }, [matchedPairs, attempts, difficulty, navigate, startTime]);

  const showFeedback = useCallback((message: string) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(null), 2000);
  }, []);

  const handleCardClick = useCallback((cardId: number) => {
    if (isLocked) return;

    const clickedCard = cards.find(c => c.id === cardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Voltear la carta
    setCards(prev =>
      prev.map(c =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      )
    );

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    // Si hay dos cartas volteadas
    if (newFlipped.length === 2) {
      setIsLocked(true);
      setAttempts(prev => prev + 1);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId)!;
      const secondCard = cards.find(c => c.id === secondId)!;

      if (firstCard.emotion.id === secondCard.emotion.id) {
        // ¡Coinciden!
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
          setIsLocked(false);
          showFeedback(`¡Correcto! Es "${secondCard.emotion.name}"`);
        }, 600);
      } else {
        // No coinciden
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 1200);
      }
    }
  }, [cards, flippedCards, isLocked, showFeedback]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, cardId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(cardId);
    }
  }, [handleCardClick]);

  const handleExitClick = () => {
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    navigate('/jugar');
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  return (
    <main
      className={styles.container}
      role="main"
      aria-label="Juego de emparejar emociones"
    >
      <header className={styles.header}>
        <button
          className={styles.exitButton}
          onClick={handleExitClick}
          aria-label="Salir del juego"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className={styles.gameInfo}>
          <div className={styles.infoBadge}>
            <span className={styles.infoLabel}>Parejas</span>
            <span className={styles.infoValue}>
              {matchedPairs}/{totalPairs.current}
            </span>
          </div>
          <div className={styles.infoBadge}>
            <span className={styles.infoLabel}>Intentos</span>
            <span className={styles.infoValue}>
              {attempts}
            </span>
          </div>
        </div>
      </header>

      <section className={styles.gameBoard}>
        <div
          className={styles.cardsGrid}
          data-difficulty={difficulty}
          role="grid"
          aria-label="Tablero de cartas"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${styles.card} ${card.isFlipped ? styles.flipped : ''} ${card.isMatched ? styles.matched : ''}`}
              onClick={() => handleCardClick(card.id)}
              onKeyDown={(e) => handleKeyDown(e, card.id)}
              role="button"
              tabIndex={card.isMatched ? -1 : 0}
              aria-label={
                card.isMatched
                  ? `Carta emparejada: ${card.emotion.name}`
                  : card.isFlipped
                    ? `Carta volteada: ${card.emotion.name}`
                    : 'Carta boca abajo. Presiona para voltear.'
              }
              aria-disabled={isLocked || card.isMatched}
            >
              <div className={styles.cardInner}>
                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                  <span className={styles.cardBackText}>?</span>
                  <span className={styles.cardBackLabel}>¡Click!</span>
                </div>
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                  <img
                    src={card.emotion.imagePath}
                    alt={card.emotion.name}
                    className={styles.emotionImage}
                  />
                  <span className={styles.cardFrontLabel}>{card.emotion.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {feedbackMessage && (
        <div
          className={styles.feedbackMessage}
          role="status"
          aria-live="polite"
        >
          {feedbackMessage}
        </div>
      )}

      {showExitModal && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
        >
          <div className={styles.modal}>
            <h2 id="exit-modal-title" className={styles.modalTitle}>
              ¿Salir del juego?
            </h2>
            <p className={styles.modalText}>
              Si sales ahora, perderás tu progreso en este nivel.
            </p>
            <div className={styles.modalButtons}>
              <button
                className={`${styles.modalButton} ${styles.cancel}`}
                onClick={handleCancelExit}
                autoFocus
              >
                Continuar jugando
              </button>
              <button
                className={`${styles.modalButton} ${styles.confirm}`}
                onClick={handleConfirmExit}
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MatchingGameView;
