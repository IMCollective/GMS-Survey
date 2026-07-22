import React, { useState, useEffect } from 'react';
import GlobalMindednessSurvey from './GlobalMindednessSurvey';
import LandingPage from './LandingPage';

export default function App() {
  const [started, setStarted] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return started ? (
    <GlobalMindednessSurvey language={language} onLanguageChange={setLanguage} />
  ) : (
    <LandingPage
      language={language}
      onLanguageChange={setLanguage}
      onStart={() => setStarted(true)}
    />
  );
}
