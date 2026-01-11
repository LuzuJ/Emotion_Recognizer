import React from 'react';
import { emotions, getEmotionsByDifficulty } from '../models/emotionModel';
import styles from './TestEmotions.module.css';

const TestEmotions: React.FC = () => {
  const facilEmotions = getEmotionsByDifficulty('facil');
  const medioEmotions = getEmotionsByDifficulty('medio');
  const dificilEmotions = getEmotionsByDifficulty('dificil');

  const renderEmotions = (emotionsList: typeof emotions, title: string) => (
    <div className={styles['difficulty-section']}>
      <h2 className={styles['difficulty-title']}>{title}</h2>
      <div className={styles['emotions-grid']}>
        {emotionsList.map(emotion => (
          <div key={emotion.id} className={styles['emotion-card']}>
            <img
              src={emotion.imagePath}
              alt={emotion.name}
              className={styles['emotion-image']}
            />
            <div className={styles['emotion-name']}>{emotion.name}</div>
            <div className={styles['emotion-difficulty']}>
              {emotion.difficulty.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles['test-container']}>
      <h1 className={styles['test-title']}>
        15 Emociones - Reconocedor Emozion
      </h1>
      
      {renderEmotions(facilEmotions, '🟢 Nivel Fácil (5 emociones básicas)')}
      {renderEmotions(medioEmotions, '🟡 Nivel Medio (10 emociones total)')}
      {renderEmotions(dificilEmotions, '🔴 Nivel Difícil (15 emociones total)')}
    </div>
  );
};

export default TestEmotions;
