import React from 'react';
import logo from './assets/logo.png';

export default function Header({ title, language, onLanguageChange }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
      <div className="flex items-center gap-3 min-w-0">
        <img src={logo} alt="" className="w-12 h-12 object-contain shrink-0" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">{title}</h1>
      </div>
      <select
        className="border p-2 rounded shrink-0"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        aria-label="Language"
      >
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}
