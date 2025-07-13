import React, { useState } from 'react';
import GlobalMindednessSurvey from './GlobalMindednessSurvey';
import LandingPage from './LandingPage';

export default function App() {
  const [started, setStarted] = useState(false);

  return started ? (
    <GlobalMindednessSurvey />
  ) : (
    <LandingPage onStart={() => setStarted(true)} />
  );
}
