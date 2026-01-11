import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmotionsByDifficulty, getRandomDistractors } from '../models/emotionModel';
import type { Emotion } from '../models/types';
import styles from './RecognitionGameView.module.css';

interface GameRound {
  emotion: Emotion;
  options: string[];
}

function RecognitionGameView() {
  const { difficulty } = useParams<{ difficulty: string }>();
  const navigate = useNavigate();

  const [rounds, setRounds] = useState<GameRound[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [startTime] = useState<Date>(new Date());

  const totalRounds = rounds.length;

  // Inicializar juego
  useEffect(() => {
    const emotions = getEmotionsByDifficulty(difficulty as 'facil' | 'medio' | 'dificil');

    // Crear rondas para cada emoción
    const gameRounds: GameRound[] = emotions.map(emotion => {
      // Obtener 3 opciones aleatorias diferentes a la correcta
      const otherEmotions = getRandomDistractors(3, emotion.id);
      const options = [emotion.name, ...otherEmotions.map(e => e.name)];

      // Mezclar opciones
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      return { emotion, options };
    });

    // Mezclar rondas
    for (let i = gameRounds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameRounds[i], gameRounds[j]] = [gameRounds[j], gameRounds[i]];
    }

    setRounds(gameRounds);
    document.title = `Reconocer - ${difficulty} - Emozion`;
  }, [difficulty]);

  // Verificar si el juego terminó
  useEffect(() => {
    if (totalRounds > 0 && currentRound >= totalRounds && !showFeedback) {
      const endTime = new Date();
      const timeSpent = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

      setTimeout(() => {
        navigate(`/completado/reconocer/${difficulty}`, {
          state: {
            score,
            totalRounds,
            maxStreak,
            timeSpent
          }
        });
      }, 500);
    }
  }, [currentRound, totalRounds, showFeedback, score, maxStreak, difficulty, navigate, startTime]);

  const handleSelectAnswer = useCallback((answer: string) => {
    if (selectedAnswer !== null) return;

    const correct = answer === rounds[currentRound].emotion.name;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    // Pasar a la siguiente ronda después del feedback
    const feedbackDuration = correct ? 1500 : 2500;
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setCurrentRound(prev => prev + 1);
    }, feedbackDuration);
  }, [selectedAnswer, rounds, currentRound, maxStreak]);

  const handleExitClick = () => {
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    navigate('/menu');
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  if (rounds.length === 0 || currentRound >= rounds.length) {
    return (
      <div className={styles.container}>
        <p>Cargando...</p>
      </div>
    );
  }

  const currentEmotion = rounds[currentRound];
  const progressPercentage = ((currentRound + 1) / totalRounds) * 100;

  return (
    <main
      className={styles.container}
      role="main"
      aria-label="Juego de reconocer emociones"
    >
      <header className={styles.header}>
        <button
          className={styles.exitButton}
          onClick={handleExitClick}
          aria-label="Salir del juego"
        >
          ✕ Salir
        </button>

        <div
          className={styles.streakContainer}
          role="status"
          aria-label={`Racha actual: ${streak} aciertos`}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`${styles.star} ${streak >= star ? styles.active : styles.inactive}`}
              aria-hidden="true"
            >
              ⭐
            </span>
          ))}
        </div>

        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
              aria-hidden="true"
            />
          </div>
          <span aria-live="polite">{currentRound + 1}/{totalRounds}</span>
        </div>
      </header>

      <section className={styles.gameContent}>
        <div className={styles.emotionCard}>
          <img
            src={currentEmotion.emotion.imagePath}
            alt="Emoción a identificar"
            className={styles.emotionImage}
          />
          <p className={styles.instructionText}>Selecciona la opción correcta:</p>
        </div>

        <div
          className={styles.optionsGrid}
          role="group"
          aria-label="Opciones de respuesta"
        >
          {currentEmotion.options.map((option) => {
            let buttonClass = styles.optionButton;
            if (selectedAnswer !== null) {
              if (option === currentEmotion.emotion.name) {
                buttonClass += ` ${styles.showCorrect}`;
              } else if (option === selectedAnswer && !isCorrect) {
                buttonClass += ` ${styles.incorrect}`;
              }
            }

            return (
              <button
                key={option}
                className={buttonClass}
                onClick={() => handleSelectAnswer(option)}
                disabled={selectedAnswer !== null}
                aria-label={`Opción: ${option}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </section>

      {showFeedback && (
        <div
          className={styles.feedbackOverlay}
          role="alert"
          aria-live="assertive"
        >
          <div className={`${styles.feedbackCard} ${isCorrect ? styles.correct : styles.incorrect}`}>
            <div className={styles.feedbackIcon}>
              {isCorrect ? '🎉' : '💭'}
            </div>
            <h2 className={styles.feedbackTitle}>
              {isCorrect ? '¡Correcto!' : 'Casi...'}
            </h2>
            <p className={styles.feedbackText}>
              {isCorrect ? (
                `¡Muy bien! Era "${currentEmotion.emotion.name}"`
              ) : (
                <>
                  La respuesta correcta era{' '}
                  <span className={styles.correctEmotion}>
                    "{currentEmotion.emotion.name}"
                  </span>
                </>
              )}
            </p>
          </div>
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

export default RecognitionGameView;
