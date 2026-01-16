import React, { useState } from 'react';
import GlobalMindednessSurvey from './GlobalMindednessSurvey';
import LandingPage from './LandingPage';

export default function App() {
  const [started, setStarted] = useState(false);
  const [language, setLanguage] = useState('en');

  return started ? (
    <GlobalMindednessSurvey initialLanguage={language} />
  ) : (
    <LandingPage
      language={language}
      setLanguage={setLanguage}
      onStart={() => setStarted(true)}
    />
  );
}
