import React from 'react';
import logo from './assets/logo.png';
import { fullSurveyData, uiText } from './surveyData';

export default function LandingPage({ language, onLanguageChange, onStart }) {
  const text = uiText[language];

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-xl mt-10 text-center border border-gray-200">
      <img src={logo} alt="Logo" className="mx-auto mb-4 w-32 h-32 object-contain" />
      <div className="mb-4">
        <select
          className="border p-2 rounded"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="en">English</option>
          <option value="zh">中文</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
        </select>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{text.welcomeTitle}</h1>
      <p className="text-lg mb-6 text-gray-700">{text.welcomeBody}</p>

      <details className="mb-6 text-left border rounded-2xl p-4 bg-gray-50">
        <summary className="cursor-pointer font-semibold text-gray-800">
          {text.aboutDomainsTitle}
        </summary>
        <p className="mt-3 mb-3 text-gray-700">{text.aboutDomainsIntro}</p>
        <ul className="space-y-2">
          {Object.keys(fullSurveyData.categories).map((category) => (
            <li key={category} className="text-gray-700">
              <strong>{fullSurveyData.categoryLabels[language][category]}:</strong>{' '}
              <span className="text-gray-600">
                {fullSurveyData.categoryDescriptions[language][category]}
              </span>
            </li>
          ))}
        </ul>
      </details>

      <button
        className="bg-brand-ocean hover:bg-brand-oceandark text-white text-xl py-3 px-8 rounded-2xl shadow-lg"
        onClick={onStart}
      >
        {text.startButton}
      </button>
    </div>
  );
}
