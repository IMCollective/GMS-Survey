import React, { useState } from "react";

const fullSurveyData = {
    questions: [
      "I generally find it stimulating to spend an evening talking with people from another culture.",
      "I feel concerned when I see my government doing something I consider wrong.",
      "My country is enriched by the fact that it comprises many people from different cultures and countries.",
      "Really, there is nothing I can do about the problems of the world.",
      "The needs of my country must continue to be our highest priority in negotiating with other countries.",
      "I often think about the kind of world we are creating for future generations.",
      "When I hear that thousands of people are starving in another country, I feel very frustrated.",
      "People can learn something of value from all different cultures.",
      "Generally, an individual's actions are too small to have a significant effect on the ecosystem.",
      "People should pursue the standard of living they can afford, even if it only has a slight negative impact on the environment.",
      "I think of myself not only as a citizen of my country but also as a citizen of the world.",
      "When I see the conditions some people in the world live under, I feel a responsibility to do something about it.",
      "I enjoy trying to understand people's behavior in the context of their culture.",
      "My opinions about national policies are based on how those policies might affect the rest of the world.",
      "It is very important to me to choose a career in which I can have a positive effect on the quality of life for future generations.",
      "My cultural values are probably the best.",
      "In the long run, my country will probably benefit from the fact that the world is becoming more interconnected.",
      "The fact that a flood can kill thousands of people in another country is very depressing to me.",
      "It is important that universities and colleges provide programs designed to promote understanding among students of different ethnic and cultural backgrounds.",
      "I think my behavior can impact people in other countries.",
      "The present distribution of the world's wealth and resources should be maintained because it promotes survival of the fittest.",
      "I feel a strong kinship with the worldwide human family.",
      "I feel very concerned about the lives of people who live in politically repressive regimes.",
      "It is important that we educate people to understand the impact that current policies might have on future generations.",
      "It is not really important to me to consider myself as a member of the global community.",
      "I sometimes try to imagine how a person who is always hungry must feel.",
      "I have very little in common with people in underdeveloped nations.",
      "I am able to affect what happens on a global level by what I do in my own community.",
      "I sometimes feel irritated with people from other countries because they don't understand how we do things here.",
      "People have a moral obligation to share their wealth with the less fortunate peoples of the world."
    ],
    reverse_scoring: [4, 5, 9, 10, 16, 21, 25, 27, 29],
    categories: {
      Responsibility: [2, 7, 12, 18, 23, 26, 30],
      CulturalPluralism: [1, 3, 8, 13, 14, 19, 24],
      Efficacy: [4, 9, 15, 20, 28],
      Interconnectedness: [6, 11, 17, 22, 25],
    },
    categoryDescriptions: {
      Responsibility: "Measures your sense of personal duty and concern for global issues.",
      CulturalPluralism: "Measures your openness to and appreciation of diverse cultures.",
      Efficacy: "Reflects how much you believe your actions can make a difference globally.",
      Interconnectedness: "Represents how strongly you feel connected to people and events worldwide.",
    },
    scaleDescriptors: [
      "Strongly Disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly Agree",
    ],
  };
  
  export default function GlobalMindednessSurvey() {
    const [responses, setResponses] = useState(Array(fullSurveyData.questions.length).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [results, setResults] = useState(null);
  
    const handleAnswer = (value) => {
      const updated = [...responses];
      updated[currentQuestion] = parseInt(value);
      setResponses(updated);
  
      if (currentQuestion < fullSurveyData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResults(updated);
      }
    };
  
    const calculateResults = (finalResponses) => {
      const adjustedResponses = finalResponses.map((value, index) =>
        fullSurveyData.reverse_scoring.includes(index + 1) ? 6 - value : value
      );
  
      const overallScore = adjustedResponses.reduce((sum, val) => sum + val, 0);
      const overallMax = fullSurveyData.questions.length * 5;
  
      const categoryScores = Object.entries(fullSurveyData.categories).reduce(
        (acc, [category, indexes]) => {
          acc[category] = indexes.reduce((sum, qIndex) => sum + adjustedResponses[qIndex - 1], 0);
          acc[`${category}Max`] = indexes.length * 5;
          return acc;
        },
        {}
      );
  
      const interpretation =
        overallScore <= 59
          ? "Low global-mindedness"
          : overallScore <= 104
          ? "Moderate global-mindedness"
          : "High global-mindedness";
  
      setResults({ overallScore, overallMax, interpretation, categoryScores });
    };
  
    return (
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl mt-10 border border-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Global Mindedness Survey</h1>
  
        {results ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Results</h2>
            <p className="text-lg mb-4 text-gray-600">
              Overall Score: <strong>{results.overallScore} / {results.overallMax}</strong> ({results.interpretation})
            </p>
            <div className="w-full bg-gray-200 rounded-full h-5 mb-8">
              <div
                className="bg-blue-600 h-5 rounded-full transition-all"
                style={{ width: `${(results.overallScore / results.overallMax) * 100}%` }}
              ></div>
            </div>
  
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Category Scores:</h3>
              <ul className="space-y-6">
                {Object.entries(results.categoryScores).filter(([key]) => !key.includes("Max")).map(([category, score]) => {
                  const max = results.categoryScores[`${category}Max`];
                  const percentage = (score / max) * 100;
                  return (
                    <li key={category}>
                      <p className="mb-1 text-gray-700">
                        <strong>{category}:</strong> {score} / {max}
                      </p>
                      <p className="mb-2 text-sm text-gray-500 italic">{fullSurveyData.categoryDescriptions[category]}</p>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-green-500 h-4 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
  
            <button
              className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-3 rounded-2xl shadow-lg"
              onClick={() => {
                setResults(null);
                setResponses(Array(fullSurveyData.questions.length).fill(null));
                setCurrentQuestion(0);
              }}
            >
              Take Survey Again
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="border rounded-2xl p-8 shadow-lg bg-gray-50">
              <p className="mb-6 text-lg font-medium text-gray-700 text-center">
                Question {currentQuestion + 1} of {fullSurveyData.questions.length}
              </p>
              <p className="mb-8 text-xl text-gray-800 text-center">{fullSurveyData.questions[currentQuestion]}</p>
              <div className="flex flex-col gap-4">
                {fullSurveyData.scaleDescriptors.map((desc, idx) => (
                  <button
                    key={idx + 1}
                    className="px-6 py-4 text-lg border rounded-2xl hover:bg-blue-100 bg-white shadow text-gray-700 font-medium transition-all w-full text-left"
                    onClick={() => handleAnswer(idx + 1)}
                  >
                    <strong>{idx + 1}:</strong> {desc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

