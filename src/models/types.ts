// Types y interfaces para el proyecto Emotion Recognizer

export type Difficulty = 'facil' | 'medio' | 'dificil';
export type GameType = 'emparejar' | 'reconocer';
export type ThemeMode = 'light' | 'dark';

export interface Emotion {
  id: string;
  name: string;
  imagePath: string;
  difficulty: Difficulty[];
}

export interface GameConfig {
  type: GameType;
  difficulty: Difficulty;
  emotions: Emotion[];
}

export interface GameState {
  currentLevel: number;
  score: number;
  streak: number;
  attempts: number;
  correctAnswers: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  imageUrl: string;
  earned: boolean;
  earnedDate?: Date;
}

export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';

export interface UserSettings {
  theme: ThemeMode;
  colorBlindMode: ColorBlindMode;
  soundEnabled: boolean;
  screenReaderEnabled: boolean;
  animationsEnabled: boolean;
}

export interface TutorialStep {
  id: number;
  description: string;
  imageUrl?: string;
  action?: string;
}

export interface MatchingCard {
  id: string;
  emotionId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface RecognitionQuestion {
  emotionId: string;
  options: string[];
  correctAnswer: string;
}
