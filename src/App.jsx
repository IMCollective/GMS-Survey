import React, { useState } from 'react';
import GlobalMindednessSurvey from './GlobalMindednessSurvey';
import LandingPage from './LandingPage';

export default function App() {
  const [started, setStarted] = useState(false);
  const [language, setLanguage] = useState('en');

  return started ? (
    <GlobalMindednessSurvey language={language} setLanguage={setLanguage} />
  ) : (
    <LandingPage
      onStart={() => setStarted(true)}
      language={language}
      setLanguage={setLanguage}
    />
  );
}
