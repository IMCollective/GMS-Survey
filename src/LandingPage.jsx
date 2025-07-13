import React from 'react';

export default function LandingPage({ onStart }) {
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-xl mt-10 text-center border border-gray-200">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to the Global Mindedness Survey</h1>
      <p className="text-lg mb-6 text-gray-700">This short questionnaire measures your attitudes about global citizenship and cultural understanding.</p>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-3 px-8 rounded-2xl shadow-lg"
        onClick={onStart}
      >
        Start Survey
      </button>
    </div>
  );
}
