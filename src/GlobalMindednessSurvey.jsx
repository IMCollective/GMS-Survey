import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { fullSurveyData, uiText, facetEducation, getFacetBand } from "./surveyData";
import logo from "./assets/logo.png";

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

  export default function GlobalMindednessSurvey({ language, onLanguageChange }) {
    const questionCount = fullSurveyData.questions.en.length;
    const [responses, setResponses] = useState(Array(questionCount).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [results, setResults] = useState(null);
    const [participantName, setParticipantName] = useState('');
    const progress = (currentQuestion + 1) / questionCount;

    const handleAnswer = (value) => {
      const updated = [...responses];
      updated[currentQuestion] = value;
      setResponses(updated);

      if (currentQuestion < questionCount - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResults(updated);
      }
    };

    const handleBack = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      }
    };
  
    const calculateResults = (finalResponses) => {
      const adjustedResponses = finalResponses.map((value, index) =>
        fullSurveyData.reverse_scoring.includes(index + 1) ? 6 - value : value
      );
  
      const overallScore = adjustedResponses.reduce((sum, val) => sum + val, 0);
      const overallMax = questionCount * 5;
  
      const categoryScores = Object.entries(fullSurveyData.categories).reduce(
        (acc, [category, indexes]) => {
          acc[category] = indexes.reduce((sum, qIndex) => sum + adjustedResponses[qIndex - 1], 0);
          acc[`${category}Max`] = indexes.length * 5;
          return acc;
        },
        {}
      );
  
      const interpretationKey =
        overallScore <= 59
          ? 'low'
          : overallScore <= 104
          ? 'moderate'
          : 'high';

      setResults({ overallScore, overallMax, interpretationKey, categoryScores });
    };

    const downloadPdf = async () => {
      if (!results) return;

      // jsPDF's built-in fonts cannot render CJK glyphs, so the PDF falls
      // back to English until an embedded Chinese font is added.
      const pdfLang = language === 'zh' ? 'en' : language;

      // The PDF is still generated if the logo fails to load.
      let logoImage = null;
      try {
        logoImage = await loadImage(logo);
      } catch {
        logoImage = null;
      }

      const doc = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'landscape' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;
      const headerHeight = 110;
      const palette = {
        accent: [236, 173, 45],
        primary: [30, 41, 59],
        muted: [100, 116, 139],
        border: [226, 232, 240],
        light: [248, 250, 252],
      };

      const trimmedName = participantName.trim();
      const overallPercent = results.overallScore / results.overallMax;

      doc.setFillColor(...palette.light);
      doc.rect(0, 0, pageWidth, headerHeight, 'F');

      let textX = margin;
      if (logoImage) {
        const logoSize = 62;
        doc.addImage(logoImage, 'PNG', margin, (headerHeight - logoSize) / 2, logoSize, logoSize);
        textX = margin + logoSize + 16;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(30);
      doc.setTextColor(...palette.primary);
      const titleText = `${uiText[pdfLang].resultsSummaryTitle} `;
      doc.text(titleText, textX, 62);
      const titleWidth = doc.getTextWidth(titleText);
      doc.setTextColor(...palette.accent);
      doc.text(uiText[pdfLang].resultsSummaryEmphasis, textX + titleWidth, 62);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(...palette.muted);
      doc.text(uiText[pdfLang].summarySubtitle, textX, 84);

      doc.setFontSize(10);
      const rightX = pageWidth - margin;
      if (trimmedName) {
        doc.text(
          `${uiText[pdfLang].participantLabel}: ${trimmedName}`,
          rightX,
          50,
          { align: 'right' }
        );
      }
      doc.text(
        `${uiText[pdfLang].reportDateLabel}: ${new Date().toLocaleDateString()}`,
        rightX,
        68,
        { align: 'right' }
      );

      const drawProgressBar = (x, y, width, height, percent, color) => {
        doc.setFillColor(226, 232, 240);
        doc.roundedRect(x, y, width, height, 6, 6, 'F');
        doc.setFillColor(color[0], color[1], color[2]);
        doc.roundedRect(x, y, width * percent, height, 6, 6, 'F');
      };

      let y = headerHeight + 20;
      const overallCardHeight = 120;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...palette.border);
      doc.roundedRect(margin, y, contentWidth, overallCardHeight, 16, 16, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(...palette.primary);
      doc.text(uiText[pdfLang].overallScore, margin + 24, y + 34);

      doc.setFontSize(30);
      doc.text(`${results.overallScore}`, margin + 24, y + 74);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(...palette.muted);
      doc.text(
        `/ ${results.overallMax}  •  ${uiText[pdfLang].interpretations[results.interpretationKey]}`,
        margin + 90,
        y + 74
      );

      drawProgressBar(
        margin + 24,
        y + 88,
        contentWidth - 48,
        12,
        overallPercent,
        palette.accent
      );

      y += overallCardHeight + 24;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(...palette.primary);
      doc.text(uiText[pdfLang].facetHighlightsTitle, margin, y);

      const cardY = y + 14;
      const gap = 12;
      const categoryOrder = Object.keys(fullSurveyData.categories);
      const cardWidth = (contentWidth - gap * (categoryOrder.length - 1)) / categoryOrder.length;
      const cardHeight = 200;
      const categoryColors = [
        [59, 130, 246],
        [245, 158, 11],
        [16, 185, 129],
        [236, 72, 153],
        [139, 92, 246],
      ];

      categoryOrder.forEach((category, index) => {
        const score = results.categoryScores[category];
        const max = results.categoryScores[`${category}Max`];
        const percentage = score / max;
        const color = categoryColors[index];
        const x = margin + index * (cardWidth + gap);
        const band = getFacetBand(score, fullSurveyData.categories[category].length);

        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(...palette.border);
        doc.roundedRect(x, cardY, cardWidth, cardHeight, 16, 16, 'FD');

        const circleX = x + cardWidth / 2;
        const circleY = cardY + 42;
        doc.setFillColor(248, 250, 252);
        doc.circle(circleX, circleY, 24, 'F');
        doc.setDrawColor(color[0], color[1], color[2]);
        doc.setLineWidth(3.5);
        doc.circle(circleX, circleY, 24, 'S');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.text(`${Math.round(percentage * 100)}%`, circleX, circleY + 4, {
          align: 'center',
        });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...palette.primary);
        doc.text(
          fullSurveyData.categoryLabels[pdfLang][category],
          x + 10,
          cardY + 86,
          { maxWidth: cardWidth - 20 }
        );

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...palette.muted);
        doc.text(
          `${score} / ${max}  •  ${uiText[pdfLang].bandNames[band]}`,
          x + 10,
          cardY + 116
        );

        doc.setFontSize(8);
        const bandLines = doc.splitTextToSize(
          facetEducation[pdfLang][category].bands[band],
          cardWidth - 20
        );
        doc.text(bandLines.slice(0, 7), x + 10, cardY + 132);
      });

      doc.setFontSize(9);
      doc.setTextColor(...palette.muted);
      doc.text(uiText[pdfLang].pdfFooterNote, margin, pageHeight - 24);

      const sanitizedName = trimmedName.replace(/[^\p{L}\p{N}_-]+/gu, '_').replace(/^_+|_+$/g, '');
      const safeName = sanitizedName || 'GMS_results';
      doc.save(`${safeName}_GMS_results.pdf`);
    };
  
    return (
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl mt-10 border border-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">{uiText[language].surveyTitle}</h1>
        <div className="mb-6 text-center">
          <select
            className="border p-2 rounded"
            value={language}
            onChange={(e) => {
              onLanguageChange(e.target.value);
            }}
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>
        </div>
  
        {results ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">{uiText[language].yourResults}</h2>
            <p className="text-lg mb-4 text-gray-600">
              {uiText[language].overallScore}: <strong>{results.overallScore} / {results.overallMax}</strong> ({uiText[language].interpretations[results.interpretationKey]})
            </p>
            <div className="w-full bg-gray-200 rounded-full h-5 mb-8">
              <div
                className="bg-blue-600 h-5 rounded-full transition-all"
                style={{ width: `${(results.overallScore / results.overallMax) * 100}%` }}
              ></div>
            </div>
  
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">{uiText[language].categoryScores}</h3>
              <ul className="space-y-6">
                {Object.keys(fullSurveyData.categories).map((category) => {
                  const score = results.categoryScores[category];
                  const max = results.categoryScores[`${category}Max`];
                  const percentage = (score / max) * 100;
                  const band = getFacetBand(score, fullSurveyData.categories[category].length);
                  const education = facetEducation[language][category];
                  return (
                    <li key={category} className="border rounded-2xl p-4 bg-gray-50">
                      <p className="mb-1 text-gray-700">
                        <strong>{fullSurveyData.categoryLabels[language][category]}:</strong> {score} / {max}
                        <span className="ml-2 text-sm font-semibold text-blue-700">
                          {uiText[language].bandNames[band]}
                        </span>
                      </p>
                      <p className="mb-2 text-sm text-gray-500 italic">{fullSurveyData.categoryDescriptions[language][category]}</p>
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                        <div
                          className="bg-green-500 h-4 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="mb-2 text-sm text-gray-700">{education.bands[band]}</p>
                      <details className="text-sm text-gray-600">
                        <summary className="cursor-pointer font-medium text-gray-700">
                          {uiText[language].growTitle}
                        </summary>
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                          {education.tips.map((tip, tipIdx) => (
                            <li key={tipIdx}>{tip}</li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-gray-700" htmlFor="participant-name">
                {uiText[language].nameLabel}
              </label>
              <input
                id="participant-name"
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder={uiText[language].namePlaceholder}
                className="w-full border p-2 rounded"
              />
            </div>
            <button
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white text-xl py-3 rounded-2xl shadow-lg"
              onClick={downloadPdf}
            >
              {uiText[language].downloadPdf}
            </button>

            <button
              className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-3 rounded-2xl shadow-lg"
              onClick={() => {
                setResults(null);
                setResponses(Array(questionCount).fill(null));
                setCurrentQuestion(0);
              }}
            >
              {uiText[language].takeSurveyAgain}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="border rounded-2xl p-8 shadow-lg bg-gray-50">
              <p className="mb-6 text-lg font-medium text-gray-700 text-center">
                {uiText[language].question} {currentQuestion + 1} {uiText[language].of} {questionCount}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress * 100}%` }}
                ></div>
              </div>
              <p className="mb-8 text-xl text-gray-800 text-center">{fullSurveyData.questions[language][currentQuestion]}</p>
              <div className="flex flex-col gap-4">
                {fullSurveyData.scaleDescriptors[language].map((desc, idx) => {
                  const selected = responses[currentQuestion] === idx + 1;
                  return (
                    <button
                      key={idx + 1}
                      className={`px-6 py-4 text-lg border rounded-2xl hover:bg-blue-100 shadow font-medium transition-all w-full text-left ${
                        selected
                          ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500 text-blue-800'
                          : 'bg-white text-gray-700'
                      }`}
                      onClick={() => handleAnswer(idx + 1)}
                    >
                      <strong>{idx + 1}:</strong> {desc}
                    </button>
                  );
                })}
              </div>
              {currentQuestion > 0 && (
                <button
                  className="mt-6 px-6 py-2 text-gray-600 border border-gray-300 rounded-2xl hover:bg-gray-100 transition-all"
                  onClick={handleBack}
                >
                  &larr; {uiText[language].back}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
