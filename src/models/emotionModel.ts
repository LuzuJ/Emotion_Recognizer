import type { Emotion, Difficulty } from './types';

// Lista de emociones disponibles en el juego
export const emotions: Emotion[] = [
  // Nivel Fácil - Emociones básicas
  {
    id: 'feliz',
    name: 'Feliz',
    imagePath: '/emotions/feliz.svg',
    difficulty: ['facil', 'medio', 'dificil']
  },
  {
    id: 'triste',
    name: 'Triste',
    imagePath: '/emotions/triste.svg',
    difficulty: ['facil', 'medio', 'dificil']
  },
  {
    id: 'enojado',
    name: 'Enojado',
    imagePath: '/emotions/enojado.svg',
    difficulty: ['facil', 'medio', 'dificil']
  },
  {
    id: 'asustado',
    name: 'Asustado',
    imagePath: '/emotions/asustado.svg',
    difficulty: ['facil', 'medio', 'dificil']
  },
  {
    id: 'sorprendido',
    name: 'Sorprendido',
    imagePath: '/emotions/sorprendido.svg',
    difficulty: ['facil', 'medio', 'dificil']
  },

  // Nivel Medio - Emociones intermedias
  {
    id: 'cansado',
    name: 'Cansado',
    imagePath: '/emotions/cansado.svg',
    difficulty: ['medio', 'dificil']
  },
  {
    id: 'confundido',
    name: 'Confundido',
    imagePath: '/emotions/confundido.svg',
    difficulty: ['medio', 'dificil']
  },
  {
    id: 'aburrido',
    name: 'Aburrido',
    imagePath: '/emotions/aburrido.svg',
    difficulty: ['medio', 'dificil']
  },
  {
    id: 'emocionado',
    name: 'Emocionado',
    imagePath: '/emotions/emocionado.svg',
    difficulty: ['medio', 'dificil']
  },
  {
    id: 'orgulloso',
    name: 'Orgulloso',
    imagePath: '/emotions/orgulloso.svg',
    difficulty: ['medio', 'dificil']
  },

  // Nivel Difícil - Emociones complejas
  {
    id: 'avergonzado',
    name: 'Avergonzado',
    imagePath: '/emotions/avergonzado.svg',
    difficulty: ['dificil']
  },
  {
    id: 'frustrado',
    name: 'Frustrado',
    imagePath: '/emotions/frustrado.svg',
    difficulty: ['dificil']
  },
  {
    id: 'celoso',
    name: 'Celoso',
    imagePath: '/emotions/celoso.svg',
    difficulty: ['dificil']
  },
  {
    id: 'tranquilo',
    name: 'Tranquilo',
    imagePath: '/emotions/tranquilo.svg',
    difficulty: ['dificil']
  },
  {
    id: 'nervioso',
    name: 'Nervioso',
    imagePath: '/emotions/nervioso.svg',
    difficulty: ['dificil']
  }
];

// Obtener emociones por dificultad
export const getEmotionsByDifficulty = (difficulty: Difficulty): Emotion[] => {
  return emotions.filter(emotion => emotion.difficulty.includes(difficulty));
};

// Obtener emoción por ID
export const getEmotionById = (id: string): Emotion | undefined => {
  return emotions.find(emotion => emotion.id === id);
};

// Obtener emociones aleatorias para un juego
export const getRandomEmotions = (difficulty: Difficulty, count: number): Emotion[] => {
  const availableEmotions = getEmotionsByDifficulty(difficulty);
  const shuffled = [...availableEmotions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, availableEmotions.length));
};

// Obtener distractores aleatorios (excluyendo la correcta)
export const getRandomDistractors = (count: number, excludeId: string): Emotion[] => {
  const available = emotions.filter(e => e.id !== excludeId);
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
