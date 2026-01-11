import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './controllers/AppContext';
import MainMenuView from './views/MainMenuView';
import GameSelectView from './views/GameSelectView';
import DifficultySelectView from './views/DifficultySelectView';
import GameWarningView from './views/GameWarningView';
import TutorialView from './views/TutorialView';
import MatchingGameView from './views/MatchingGameView';
import RecognitionGameView from './views/RecognitionGameView';
import GameCompletedView from './views/GameCompletedView';
import CollectiblesView from './views/CollectiblesView';
import ConfigView from './views/ConfigView';
import ExitView from './views/ExitView';
import TestEmotions from './views/TestEmotions';
import './styles/global.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainMenuView />} />
          <Route path="/menu" element={<Navigate to="/" replace />} />
          <Route path="/jugar" element={<GameSelectView />} />
          <Route path="/dificultad/:gameType" element={<DifficultySelectView />} />

          <Route path="/advertencia/:gameType/:difficulty" element={<GameWarningView />} />
          <Route path="/tutorial/:gameType" element={<TutorialView />} />
          <Route path="/juego/emparejar/:difficulty" element={<MatchingGameView />} />
          <Route path="/juego/reconocer/:difficulty" element={<RecognitionGameView />} />
          <Route path="/completado/:gameType/:difficulty" element={<GameCompletedView />} />
          <Route path="/coleccionables" element={<CollectiblesView />} />
          <Route path="/configuracion" element={<ConfigView />} />
          <Route path="/salir" element={<ExitView />} />
          <Route path="/test-emotions" element={<TestEmotions />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
