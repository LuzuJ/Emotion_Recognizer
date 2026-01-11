import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserSettings, Badge, GameState } from '../models/types';

interface AppContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  collectedBadges: Badge[];
  addBadge: (badge: Badge) => void;
  gameState: GameState | null;
  setGameState: (state: GameState | null) => void;
  resetGameState: () => void;
}

const defaultSettings: UserSettings = {
  theme: 'light',
  colorBlindMode: 'none',
  soundEnabled: true,
  screenReaderEnabled: false,
  animationsEnabled: true
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('emotionRecognizerSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [collectedBadges, setCollectedBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('emotionRecognizerBadges');
    return saved ? JSON.parse(saved) : [];
  });

  const [gameState, setGameState] = useState<GameState | null>(null);

  // Guardar configuración en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('emotionRecognizerSettings', JSON.stringify(settings));

    // Aplicar tema
    document.documentElement.setAttribute('data-theme', settings.theme);
    // Aplicar modo daltonismo
    document.documentElement.setAttribute('data-color-blind', settings.colorBlindMode);
  }, [settings]);

  // Guardar insignias en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('emotionRecognizerBadges', JSON.stringify(collectedBadges));
  }, [collectedBadges]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addBadge = (badge: Badge) => {
    setCollectedBadges(prev => {
      // Evitar duplicados
      if (prev.some(b => b.id === badge.id)) {
        return prev;
      }
      return [...prev, { ...badge, earned: true, earnedDate: new Date() }];
    });
  };

  const resetGameState = () => {
    setGameState(null);
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        collectedBadges,
        addBadge,
        gameState,
        setGameState,
        resetGameState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de AppProvider');
  }
  return context;
};
