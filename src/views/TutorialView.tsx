import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './TutorialView.module.css';

interface TutorialStep {
  description: string;
  illustration: 'step1' | 'step2' | 'step3' | 'step4' | 'recognize1' | 'recognize2';
}

const emparejarSteps: TutorialStep[] = [
  {
    description: 'Toca una carta para voltearla y ver la emoción que esconde.',
    illustration: 'step1'
  },
  {
    description: 'Toca otra carta para ver si coincide con la primera.',
    illustration: 'step2'
  },
  {
    description: '¡Si ambas emociones son iguales, las cartas quedarán boca arriba!',
    illustration: 'step3'
  },
  {
    description: 'Si no coinciden, las cartas se voltearán de nuevo. ¡Sigue intentando!',
    illustration: 'step4'
  }
];

const reconocerSteps: TutorialStep[] = [
  {
    description: 'Observa la imagen de la emoción que aparece en la pantalla.',
    illustration: 'recognize1'
  },
  {
    description: 'Selecciona el nombre de la emoción que crees que es correcta.',
    illustration: 'recognize2'
  }
];

function TutorialView() {
  const { gameType } = useParams<{ gameType: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [cardStates, setCardStates] = useState<('down' | 'up' | 'matched' | 'wrong')[]>(['down', 'down', 'down', 'down']);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const isEmparejar = gameType === 'emparejar';
  const steps = isEmparejar ? emparejarSteps : reconocerSteps;
  const totalSteps = steps.length;

  // Animación de las cartas según el paso
  useEffect(() => {
    if (!isEmparejar) return;

    const animateCards = () => {
      switch (currentStep) {
        case 0: // Paso 1: voltear primera carta
          setCardStates(['up', 'down', 'down', 'down']);
          break;
        case 1: // Paso 2: voltear segunda carta
          setCardStates(['up', 'up', 'down', 'down']);
          break;
        case 2: // Paso 3: coinciden
          setCardStates(['matched', 'matched', 'down', 'down']);
          break;
        case 3: // Paso 4: no coinciden
          setCardStates(['up', 'down', 'wrong', 'down']);
          setTimeout(() => {
            setCardStates(['down', 'down', 'down', 'down']);
          }, 1500);
          break;
      }
    };

    animateCards();
  }, [currentStep, isEmparejar]);

  // Animación para reconocer
  useEffect(() => {
    if (isEmparejar) return;

    if (currentStep === 1) {
      const timer = setTimeout(() => {
        setSelectedOption('Feliz');
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setSelectedOption(null);
    }
  }, [currentStep, isEmparejar]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Volver a la selección de dificultad
      navigate(`/dificultad/${gameType}`);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigate(`/dificultad/${gameType}`);
  };

  const getCardEmoji = (index: number, state: string) => {
    if (state === 'down') return null;
    const emojis = ['😊', '😊', '😢', '😢'];
    return emojis[index];
  };

  const renderEmparejarIllustration = () => {
    return (
      <div className={styles.cardsDemo}>
        {cardStates.map((state, index) => (
          <div
            key={index}
            className={`${styles.demoCard} ${state === 'down' ? styles.faceDown :
              state === 'matched' ? styles.matched :
                state === 'wrong' ? styles.wrong :
                  styles.faceUp
              }`}
            aria-label={state === 'down' ? 'Carta boca abajo' : `Carta con emoción ${getCardEmoji(index, state)}`}
          >
            {state === 'down' ? (
              <div className={styles.cardBack} />
            ) : (
              <span className={styles.cardFront}>{getCardEmoji(index, state)}</span>
            )}
          </div>
        ))}
        {currentStep === 0 && (
          <span className={styles.handPointer} role="img" aria-label="Indicador de toque">👆</span>
        )}
      </div>
    );
  };

  const renderReconocerIllustration = () => {
    const options = ['Feliz', 'Triste', 'Enojado', 'Asustado'];

    return (
      <div className={styles.emotionDisplay}>
        <img
          src="/emotions/feliz.svg"
          alt="Emoción a identificar"
          className={styles.emotionImage}
        />
        {currentStep === 0 && (
          <span className={styles.handPointer} role="img" aria-label="Observa la emoción">👀</span>
        )}
        {currentStep === 1 && (
          <div className={styles.optionsGrid}>
            {options.map((option) => (
              <button
                key={option}
                className={`${styles.optionButton} ${selectedOption === option ?
                  (option === 'Feliz' ? styles.correct : styles.selected)
                  : ''
                  }`}
                disabled
                aria-label={`Opción: ${option}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className={styles.container} role="main" aria-label={`Tutorial de ${isEmparejar ? 'emparejar' : 'reconocer'}`}>
      <header className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Tutorial</h1>
        </div>

        <div className={styles.logoContainer}>
          <img src="/logo-emotion.png" alt="Emotion Recognizer Logo" className={styles.gameLogo} />
          <span className={styles.logoText}>EMOTION RECOGNIZER</span>
        </div>
      </header>

      <div className={styles.contentCard}>
        <p className={styles.stepDescription} aria-live="polite">
          <strong>Paso {currentStep + 1}:</strong> {steps[currentStep].description}
        </p>

        <div className={styles.illustration} aria-live="polite">
          {isEmparejar ? renderEmparejarIllustration() : renderReconocerIllustration()}
        </div>

        <div className={styles.stepIndicator} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={totalSteps}>
          {steps.map((_, index) => (
            <div
              key={index}
              className={`${styles.stepDot} ${index === currentStep ? styles.active :
                index < currentStep ? styles.completed : ''
                }`}
            />
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <button
          className={styles.skipButton}
          onClick={handleSkip}
          aria-label="Saltar tutorial"
        >
          Saltar
        </button>

        <div className={styles.navGroup}>
          <button
            className={`${styles.navButton} ${styles.prev}`}
            onClick={handlePrev}
            disabled={currentStep === 0}
            aria-label="Paso anterior"
          >
            Anterior
          </button>

          <button
            className={`${styles.navButton} ${styles.next}`}
            onClick={handleNext}
            aria-label={currentStep === totalSteps - 1 ? 'Finalizar tutorial' : 'Siguiente paso'}
          >
            {currentStep === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}
            <span className={styles.navIcon}>→</span>
          </button>
        </div>
      </footer>
    </main>
  );
}

export default TutorialView;
