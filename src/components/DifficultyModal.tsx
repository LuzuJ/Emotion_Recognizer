import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DifficultyModal.module.css';

interface DifficultyModalProps {
    gameType: 'emparejar' | 'reconocer';
    onClose: () => void;
    onStart: (difficulty: string) => void;
}

const DifficultyModal: React.FC<DifficultyModalProps> = ({ gameType, onClose, onStart }) => {
    const [mode, setMode] = useState<'ready' | 'selecting'>('ready');
    const [selectedDifficulty, setSelectedDifficulty] = useState<'facil' | 'medio' | 'dificil'>('facil');
    const navigate = useNavigate();

    const getDifficultyLabel = (diff: string) => {
        switch (diff) {
            case 'facil': return 'Fácil';
            case 'medio': return 'Medio';
            case 'dificil': return 'Difícil';
            default: return 'Fácil';
        }
    };

    const getEmotionCount = (diff: string) => {
        switch (diff) {
            case 'facil': return 5;
            case 'medio': return 8;
            case 'dificil': return 12;
            default: return 5;
        }
    };

    const handleDifficultySelect = (diff: 'facil' | 'medio' | 'dificil') => {
        setSelectedDifficulty(diff);
        setMode('ready');
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                    X
                </button>

                {mode === 'ready' ? (
                    <>
                        <div className={styles.iconContainer}>
                            {/* 60px Gamepad Icon */}
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="#6366f1" stroke="none">
                                <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H9v2H7v-2H5v-2h2v-2h2v2h2v2zm4 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2-2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                            </svg>
                        </div>

                        <h2 className={styles.title}>¡Listo para jugar!</h2>
                        <p className={styles.subtitle}>
                            {gameType === 'emparejar'
                                ? 'Vas a buscar parejas de emociones. Voltea las cartas y encuentra las que son iguales.'
                                : 'Identifica la emoción correcta basándote en la expresión facial mostrada.'}
                        </p>

                        <div className={styles.statsBox}>
                            <div className={styles.statsTitle}>Tu juego:</div>
                            <div className={styles.statItem}>
                                <span>🎯</span> Juego: <strong>{gameType === 'emparejar' ? 'Emparejar' : 'Reconocer'}</strong>
                            </div>
                            <div className={styles.statItem}>
                                <span>🟢</span> Dificultad: <strong>{getDifficultyLabel(selectedDifficulty)}</strong>
                            </div>
                            <div className={styles.statItem}>
                                <span>🤩</span> Emociones: <strong>{getEmotionCount(selectedDifficulty)}</strong>
                            </div>
                        </div>

                        <button className={styles.startButton} onClick={() => onStart(selectedDifficulty)}>
                            ¡Empezar!
                        </button>

                        <button className={styles.secondaryButton} onClick={() => setMode('selecting')}>
                            ← Cambiar dificultad
                        </button>

                        <div className={styles.extrasRow}>
                            <button className={styles.iconButton} onClick={() => navigate(`/tutorial/${gameType}`)} title="Cómo jugar">
                                <span>❓</span> Cómo jugar
                            </button>
                            <button className={styles.iconButton} onClick={() => navigate('/configuracion')} title="Configuración">
                                <span>⚙️</span> Configuración
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className={styles.title}>Elige la dificultad</h2>
                        <div className={styles.selectionGrid}>
                            <button
                                className={`${styles.difficultyOption} ${selectedDifficulty === 'facil' ? styles.active : ''}`}
                                onClick={() => handleDifficultySelect('facil')}
                            >
                                <span>Fácil</span>
                                <span>🟢</span>
                            </button>
                            <button
                                className={`${styles.difficultyOption} ${selectedDifficulty === 'medio' ? styles.active : ''}`}
                                onClick={() => handleDifficultySelect('medio')}
                            >
                                <span>Medio</span>
                                <span>🟡</span>
                            </button>
                            <button
                                className={`${styles.difficultyOption} ${selectedDifficulty === 'dificil' ? styles.active : ''}`}
                                onClick={() => handleDifficultySelect('dificil')}
                            >
                                <span>Difícil</span>
                                <span>🔴</span>
                            </button>
                        </div>
                        <button className={styles.secondaryButton} onClick={() => setMode('ready')}>
                            Volver
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default DifficultyModal;
