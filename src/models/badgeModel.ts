import type { Badge } from './types';

// Lista de insignias disponibles
export const badges: Badge[] = [
  // Insignias por completar niveles
  {
    id: 'estrella-oro',
    name: 'Estrella de Oro',
    description: 'Completaste el nivel sin errores',
    icon: '🌟',
    imageUrl: '/badges/estrella-oro.png',
    earned: false
  },
  {
    id: 'estrella-plata',
    name: 'Estrella de Plata',
    description: 'Completaste el nivel con pocos errores',
    icon: '⭐',
    imageUrl: '/badges/estrella-plata.png',
    earned: false
  },
  {
    id: 'racha-5',
    name: 'Racha de 5',
    description: 'Acertaste 5 respuestas seguidas',
    icon: '🔥',
    imageUrl: '/badges/racha-5.png',
    earned: false
  },
  {
    id: 'racha-10',
    name: 'Racha de 10',
    description: 'Acertaste 10 respuestas seguidas',
    icon: '💥',
    imageUrl: '/badges/racha-10.png',
    earned: false
  },
  {
    id: 'maestro-emociones',
    name: 'Maestro de Emociones',
    description: 'Completaste todos los niveles de un juego',
    icon: '🏆',
    imageUrl: '/badges/maestro.png',
    earned: false
  },
  {
    id: 'explorador',
    name: 'Explorador',
    description: 'Completaste tu primer nivel',
    icon: '🧭',
    imageUrl: '/badges/explorador.png',
    earned: false
  },
  {
    id: 'persistente',
    name: 'Persistente',
    description: 'Completaste un nivel difícil',
    icon: '💪',
    imageUrl: '/badges/persistente.png',
    earned: false
  },
  {
    id: 'memoria-experta',
    name: 'Memoria Experta',
    description: 'Completaste emparejar con pocos errores',
    icon: '🧠',
    imageUrl: '/badges/memoria.png',
    earned: false
  },
  {
    id: 'reconocedor-pro',
    name: 'Reconocedor Pro',
    description: 'Completaste reconocer con racha perfecta',
    icon: '🎯',
    imageUrl: '/badges/reconocedor.png',
    earned: false
  }
];

// Obtener insignia por ID
export const getBadgeById = (id: string): Badge | undefined => {
  return badges.find(badge => badge.id === id);
};

// Calcular insignias ganadas basadas en el rendimiento
interface GamePerformance {
  gameType: 'emparejar' | 'reconocer';
  difficulty: 'facil' | 'medio' | 'dificil';
  // Emparejar
  attempts?: number;
  matchedPairs?: number;
  totalPairs?: number;
  // Reconocer
  score?: number;
  totalRounds?: number;
  maxStreak?: number;
  timeSpent?: number;
}

export const calculateBadges = (performance: GamePerformance): Badge[] => {
  const earnedBadges: Badge[] = [];
  const { gameType, difficulty, attempts, matchedPairs, totalPairs, score, totalRounds, maxStreak } = performance;

  // Insignia explorador (primer juego completado)
  const explorador = getBadgeById('explorador');
  if (explorador) {
    earnedBadges.push({ ...explorador, earned: true, earnedDate: new Date() });
  }

  if (gameType === 'emparejar' && totalPairs && matchedPairs && attempts) {
    const efficiency = totalPairs / attempts; // 1 = perfecto

    // Estrella de oro: completar sin errores extras
    if (efficiency >= 0.9) {
      const estrella = getBadgeById('estrella-oro');
      if (estrella) earnedBadges.push({ ...estrella, earned: true, earnedDate: new Date() });
    } else if (efficiency >= 0.7) {
      const estrella = getBadgeById('estrella-plata');
      if (estrella) earnedBadges.push({ ...estrella, earned: true, earnedDate: new Date() });
    }

    // Memoria experta: pocos intentos
    if (attempts <= totalPairs * 1.5) {
      const memoria = getBadgeById('memoria-experta');
      if (memoria) earnedBadges.push({ ...memoria, earned: true, earnedDate: new Date() });
    }
  }

  if (gameType === 'reconocer' && totalRounds && score !== undefined) {
    const accuracy = score / totalRounds;

    // Estrella de oro: 100% aciertos
    if (accuracy === 1) {
      const estrella = getBadgeById('estrella-oro');
      if (estrella) earnedBadges.push({ ...estrella, earned: true, earnedDate: new Date() });
    } else if (accuracy >= 0.8) {
      const estrella = getBadgeById('estrella-plata');
      if (estrella) earnedBadges.push({ ...estrella, earned: true, earnedDate: new Date() });
    }

    // Rachas
    if (maxStreak && maxStreak >= 10) {
      const racha = getBadgeById('racha-10');
      if (racha) earnedBadges.push({ ...racha, earned: true, earnedDate: new Date() });
    } else if (maxStreak && maxStreak >= 5) {
      const racha = getBadgeById('racha-5');
      if (racha) earnedBadges.push({ ...racha, earned: true, earnedDate: new Date() });
    }

    // Reconocedor pro
    if (accuracy === 1 && maxStreak && maxStreak >= 5) {
      const pro = getBadgeById('reconocedor-pro');
      if (pro) earnedBadges.push({ ...pro, earned: true, earnedDate: new Date() });
    }
  }

  // Persistente: completar nivel difícil
  if (difficulty === 'dificil') {
    const persistente = getBadgeById('persistente');
    if (persistente) earnedBadges.push({ ...persistente, earned: true, earnedDate: new Date() });
  }

  return earnedBadges;
};

// Verificar si se desbloquea una insignia de maestría
export const getNewBadge = (
  _gameType: string,
  _difficulty: string,
  _collectedBadges: Badge[]
): Badge | null => {
  // Por ahora retornamos null, pero se puede expandir para verificar
  // si el usuario completó todos los niveles de un juego
  return null;
};

// Verificar si se gana una insignia basado en el desempeño (legacy)
export const checkBadgeEarned = (
  badgeId: string,
  gameState: { correctAnswers: number; attempts: number; streak: number; difficulty: string }
): boolean => {
  const { correctAnswers, attempts, streak, difficulty } = gameState;
  const accuracy = attempts > 0 ? (correctAnswers / attempts) * 100 : 0;

  switch (badgeId) {
    case 'estrella-oro':
      return accuracy === 100;
    case 'estrella-plata':
      return accuracy >= 80 && accuracy < 100;
    case 'racha-5':
      return streak >= 5;
    case 'racha-10':
      return streak >= 10;
    case 'explorador':
      return correctAnswers > 0;
    case 'persistente':
      return difficulty === 'dificil' && accuracy >= 70;
    case 'memoria-experta':
      return accuracy === 100;
    case 'reconocedor-pro':
      return streak >= 10;
    default:
      return false;
  }
};

// Obtener insignias ganadas en una sesión de juego (legacy)
export const getEarnedBadges = (gameState: {
  correctAnswers: number;
  attempts: number;
  streak: number;
  difficulty: string;
}): Badge[] => {
  return badges
    .filter(badge => checkBadgeEarned(badge.id, gameState))
    .map(badge => ({
      ...badge,
      earned: true,
      earnedDate: new Date()
    }));
};
