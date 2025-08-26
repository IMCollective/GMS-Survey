import React, { useState } from "react";
import { jsPDF } from "jspdf";

const fullSurveyData = {
    questions: {
      en: [
        "I generally find it stimulating to spend an evening talking with people from another culture.",
        "I feel concerned when I see my government doing something I consider wrong.",
        "My country is enriched by the fact that it comprises many people from different cultures and countries.",
        "Really, there is nothing I can do about the problems of the world.",
        "The needs of my country must continue to be our highest priority in negotiating with other countries.",
        "I often think about the kind of world we are creating for future generations.",
        "When I hear that thousands of people are starving in another country, I feel very frustrated.",
        "People can learn something of value from all different cultures.",
        "Generally, an individual's actions are too small to have a significant effect on the ecosystem.",
        "People should be permitted to pursue the standard of living they can afford, if it only has a slight negative impact on the environment.",
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
      zh: [
        "我通常觉得与来自其他文化的人共度一个晚上聊天很有趣。",
        "当我看到政府做一些我认为错误的事情时，我会感到担忧。",
        "我的国家因拥有来自不同文化和国家的人民而更加丰富。",
        "实际上，世界的问题我无能为力。",
        "在与其他国家谈判时，我国的需求必须始终放在首位。",
        "我经常思考我们正在为后代创造一个怎样的世界。",
        "当我听说另一个国家有成千上万人在挨饿时，我感到非常沮丧。",
        "人们可以从各种不同的文化中学到有价值的东西。",
        "通常个人的行动太小，无法对生态系统产生重大影响。",
        "如果对环境只有轻微的负面影响，人们应该被允许追求他们负担得起的生活水平。",
        "我认为自己不仅是我国家的公民，也是世界公民。",
        "当我看到世界上有些人的生活条件时，我觉得有责任做些什么。",
        "我喜欢在文化背景下理解人们的行为。",
        "我对国家政策的看法基于这些政策可能对世界其他地方产生的影响。",
        "对我来说，选择一份能对后代的生活质量产生积极影响的职业非常重要。",
        "我的文化价值观可能是最好的。",
        "从长远来看，我的国家可能会因为世界日益互联而受益。",
        "得知洪水能在其他国家夺走成千上万人的生命，我感到十分沮丧。",
        "大学和学院应当提供项目，以促进不同民族和文化背景学生之间的理解。",
        "我认为我的行为会影响到其他国家的人。",
        "世界财富和资源目前的分配应当保持，因为它促进了适者生存。",
        "我与全世界的人类家庭感到强烈的亲情。",
        "我对生活在政治压制政权下的人的生活感到非常关切。",
        "我们有必要教育人们了解当前政策可能对后代产生的影响。",
        "是否把自己看作全球社区的一员对我来说并不重要。",
        "我有时会试着想象一个长期饥饿的人会有什么感受。",
        "我与欠发达国家的人几乎没有共同之处。",
        "通过在自己社区的行动，我能影响全球层面发生的事情。",
        "有时我会对外国人感到恼火，因为他们不了解我们在这里的做事方式。",
        "人们有道德义务与世界上不幸的人分享他们的财富。"
      ],
      fr: [
        "Je trouve généralement stimulant de passer une soirée à discuter avec des personnes d'une autre culture.",
        "Je me sens préoccupé lorsque je vois mon gouvernement faire quelque chose que je considère comme mal.",
        "Mon pays est enrichi par le fait qu'il comprend de nombreuses personnes de différentes cultures et nationalités.",
        "En réalité, il n'y a rien que je puisse faire concernant les problèmes du monde.",
        "Les besoins de mon pays doivent rester notre priorité absolue dans les négociations avec les autres pays.",
        "Je pense souvent au type de monde que nous créons pour les générations futures.",
        "Lorsque j'entends que des milliers de personnes meurent de faim dans un autre pays, je me sens très frustré.",
        "On peut apprendre quelque chose de valeur de toutes les cultures différentes.",
        "En général, les actions d'un individu sont trop minimes pour avoir un effet significatif sur l'écosystème.",
        "Les gens devraient être autorisés à rechercher le niveau de vie qu'ils peuvent se permettre si cela n'a qu'un impact négatif minime sur l'environnement.",
        "Je me considère non seulement comme un citoyen de mon pays mais aussi comme un citoyen du monde.",
        "Lorsque je vois les conditions dans lesquelles vivent certaines personnes dans le monde, je me sens responsable de faire quelque chose.",
        "J'apprécie d'essayer de comprendre le comportement des gens dans le contexte de leur culture.",
        "Mes opinions sur les politiques nationales se basent sur la façon dont ces politiques pourraient affecter le reste du monde.",
        "Il est très important pour moi de choisir une carrière où je peux avoir un effet positif sur la qualité de vie des générations futures.",
        "Mes valeurs culturelles sont probablement les meilleures.",
        "À long terme, mon pays bénéficiera probablement du fait que le monde devient de plus en plus interconnecté.",
        "Le fait qu'une inondation puisse tuer des milliers de personnes dans un autre pays me déprime beaucoup.",
        "Il est important que les universités et les collèges offrent des programmes destinés à promouvoir la compréhension entre étudiants de différentes origines ethniques et culturelles.",
        "Je pense que mon comportement peut avoir un impact sur les gens d'autres pays.",
        "La distribution actuelle des richesses et des ressources mondiales devrait être maintenue parce qu'elle favorise la survie du plus apte.",
        "Je ressens une forte parenté avec la famille humaine mondiale.",
        "Je suis très préoccupé par la vie des personnes qui vivent sous des régimes politiquement répressifs.",
        "Il est important d'éduquer les gens pour qu'ils comprennent l'impact que les politiques actuelles pourraient avoir sur les générations futures.",
        "Il n'est pas vraiment important pour moi de me considérer comme membre de la communauté mondiale.",
        "J'essaie parfois d'imaginer ce que ressent une personne qui a toujours faim.",
        "J'ai très peu de choses en commun avec les personnes des pays sous-développés.",
        "Je suis capable d'influer sur ce qui se passe au niveau mondial par ce que je fais dans ma propre communauté.",
        "Je me sens parfois irrité par les gens d'autres pays parce qu'ils ne comprennent pas notre façon de faire.",
        "Les gens ont l'obligation morale de partager leur richesse avec les peuples moins fortunés du monde."
      ],
      es: [
        "Generalmente me resulta estimulante pasar una noche hablando con personas de otra cultura.",
        "Me siento preocupado cuando veo que mi gobierno hace algo que considero incorrecto.",
        "Mi país se enriquece por el hecho de que está compuesto por muchas personas de diferentes culturas y países.",
        "En realidad, no hay nada que yo pueda hacer respecto a los problemas del mundo.",
        "Las necesidades de mi país deben seguir siendo nuestra máxima prioridad al negociar con otros países.",
        "A menudo pienso en el tipo de mundo que estamos creando para las generaciones futuras.",
        "Cuando escucho que miles de personas se mueren de hambre en otro país, me siento muy frustrado.",
        "La gente puede aprender algo valioso de todas las diferentes culturas.",
        "Por lo general, las acciones de un individuo son demasiado pequeñas para tener un efecto significativo en el ecosistema.",
        "Se debería permitir a las personas buscar el nivel de vida que puedan costearse, si solo tiene un impacto negativo leve en el medio ambiente.",
        "Me considero no solo ciudadano de mi país sino también ciudadano del mundo.",
        "Cuando veo las condiciones en las que vive alguna gente en el mundo, siento la responsabilidad de hacer algo.",
        "Disfruto intentar entender el comportamiento de las personas en el contexto de su cultura.",
        "Mis opiniones sobre las políticas nacionales se basan en cómo esas políticas podrían afectar al resto del mundo.",
        "Es muy importante para mí elegir una carrera en la que pueda tener un efecto positivo en la calidad de vida de las futuras generaciones.",
        "Mis valores culturales son probablemente los mejores.",
        "A la larga, mi país probablemente se beneficiará del hecho de que el mundo está cada vez más interconectado.",
        "El hecho de que una inundación pueda matar a miles de personas en otro país me deprime mucho.",
        "Es importante que las universidades y los colegios ofrezcan programas diseñados para promover la comprensión entre estudiantes de diferentes orígenes étnicos y culturales.",
        "Creo que mi comportamiento puede impactar a personas en otros países.",
        "La distribución actual de la riqueza y los recursos del mundo debería mantenerse porque promueve la supervivencia del más apto.",
        "Siento un fuerte vínculo con la familia humana mundial.",
        "Me preocupan mucho las vidas de las personas que viven en regímenes políticamente represivos.",
        "Es importante que eduquemos a la gente para que comprenda el impacto que las políticas actuales podrían tener en las generaciones futuras.",
        "No es realmente importante para mí considerarme miembro de la comunidad global.",
        "A veces intento imaginar cómo debe sentirse una persona que siempre tiene hambre.",
        "Tengo muy poco en común con la gente de las naciones subdesarrolladas.",
        "Soy capaz de afectar lo que sucede a nivel global por lo que hago en mi propia comunidad.",
        "A veces me siento irritado con personas de otros países porque no entienden cómo hacemos las cosas aquí.",
        "La gente tiene la obligación moral de compartir su riqueza con los pueblos menos afortunados del mundo."
      ]
    },
    reverse_scoring: [4, 5, 9, 10, 16, 21, 25, 27, 29],
    categories: {
      Responsibility: [2, 7, 12, 18, 23, 26, 30],
      CulturalPluralism: [1, 3, 8, 13, 14, 19, 24],
      Efficacy: [4, 9, 15, 20, 28],
      Interconnectedness: [6, 11, 17, 22, 25],
    },
    categoryLabels: {
      en: {
        Responsibility: "Responsibility",
        CulturalPluralism: "Cultural Pluralism",
        Efficacy: "Efficacy",
        Interconnectedness: "Interconnectedness",
      },
      zh: {
        Responsibility: "责任",
        CulturalPluralism: "文化多元性",
        Efficacy: "效能感",
        Interconnectedness: "互联性",
      },
      fr: {
        Responsibility: "Responsabilité",
        CulturalPluralism: "Pluralisme culturel",
        Efficacy: "Efficacité",
        Interconnectedness: "Interconnexion",
      },
      es: {
        Responsibility: "Responsabilidad",
        CulturalPluralism: "Pluralismo cultural",
        Efficacy: "Eficacia",
        Interconnectedness: "Interconexión",
      },
    },
    categoryDescriptions: {
      en: {
        Responsibility: "Measures your sense of personal duty and concern for global issues.",
        CulturalPluralism: "Measures your openness to and appreciation of diverse cultures.",
        Efficacy: "Reflects how much you believe your actions can make a difference globally.",
        Interconnectedness: "Represents how strongly you feel connected to people and events worldwide.",
      },
      zh: {
        Responsibility: "衡量你对全球问题的个人责任感和关切。",
        CulturalPluralism: "衡量你对多元文化的开放与欣赏程度。",
        Efficacy: "反映你相信自己的行动在全球产生影响的程度。",
        Interconnectedness: "代表你与世界各地的人和事件感到联系的强度。",
      },
      fr: {
        Responsibility: "Mesure votre sens du devoir personnel et votre préoccupation pour les enjeux mondiaux.",
        CulturalPluralism: "Mesure votre ouverture et votre appréciation des diverses cultures.",
        Efficacy: "Reflète dans quelle mesure vous pensez que vos actions peuvent faire la différence à l'échelle mondiale.",
        Interconnectedness: "Représente la force avec laquelle vous vous sentez connecté aux personnes et événements dans le monde.",
      },
      es: {
        Responsibility: "Mide tu sentido del deber personal y la preocupación por los asuntos globales.",
        CulturalPluralism: "Mide tu apertura y apreciación de diversas culturas.",
        Efficacy: "Refleja cuánto crees que tus acciones pueden marcar la diferencia a nivel global.",
        Interconnectedness: "Representa qué tan conectado te sientes con las personas y eventos del mundo.",
      },
    },
    scaleDescriptors: {
      en: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      zh: ["非常不同意", "不同意", "中立", "同意", "非常同意"],
      fr: ["Tout à fait en désaccord", "En désaccord", "Neutre", "D'accord", "Tout à fait d'accord"],
      es: ["Totalmente en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Totalmente de acuerdo"],
    },
  };

const uiText = {
  en: {
    surveyTitle: "Global Mindedness Survey",
    yourResults: "Your Results",
    overallScore: "Overall Score",
    categoryScores: "Category Scores:",
    downloadPdf: "Download PDF",
    takeSurveyAgain: "Take Survey Again",
    question: "Question",
    of: "of",
    nameLabel: "Your Name",
    namePlaceholder: "Enter your name",
    interpretations: {
      low: "Low global-mindedness",
      moderate: "Moderate global-mindedness",
      high: "High global-mindedness",
    },
  },
  zh: {
    surveyTitle: "全球意识调查",
    yourResults: "你的结果",
    overallScore: "总分",
    categoryScores: "分类得分：",
    downloadPdf: "下载 PDF",
    takeSurveyAgain: "再次参与调查",
    question: "问题",
    of: "/",
    nameLabel: "你的名字",
    namePlaceholder: "输入你的名字",
    interpretations: {
      low: "全球意识低",
      moderate: "全球意识中等",
      high: "全球意识高",
    },
  },
  fr: {
    surveyTitle: "Sondage sur l'ouverture au monde",
    yourResults: "Vos résultats",
    overallScore: "Score total",
    categoryScores: "Scores par catégorie :",
    downloadPdf: "Télécharger le PDF",
    takeSurveyAgain: "Reprendre le sondage",
    question: "Question",
    of: "sur",
    nameLabel: "Votre nom",
    namePlaceholder: "Entrez votre nom",
    interpretations: {
      low: "Faible ouverture mondiale",
      moderate: "Ouverture mondiale modérée",
      high: "Forte ouverture mondiale",
    },
  },
  es: {
    surveyTitle: "Encuesta de Mentalidad Global",
    yourResults: "Tus resultados",
    overallScore: "Puntuación total",
    categoryScores: "Puntuaciones por categoría:",
    downloadPdf: "Descargar PDF",
    takeSurveyAgain: "Realizar la encuesta de nuevo",
    question: "Pregunta",
    of: "de",
    nameLabel: "Tu nombre",
    namePlaceholder: "Ingresa tu nombre",
    interpretations: {
      low: "Baja mentalidad global",
      moderate: "Mentalidad global moderada",
      high: "Alta mentalidad global",
    },
  },
};
  
  export default function GlobalMindednessSurvey() {
    const [language, setLanguage] = useState('en');
    const questionCount = fullSurveyData.questions.en.length;
    const [responses, setResponses] = useState(Array(questionCount).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [results, setResults] = useState(null);
    const [participantName, setParticipantName] = useState('');
  
    const handleAnswer = (value) => {
      const updated = [...responses];
      updated[currentQuestion] = parseInt(value);
      setResponses(updated);
  
      if (currentQuestion < questionCount - 1) {
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
      const interpretation = uiText[language].interpretations[interpretationKey];

      setResults({ overallScore, overallMax, interpretation, categoryScores });
    };

    const downloadPdf = () => {
      if (!results) return;

      const doc = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'landscape' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      const trimmedName = participantName.trim();
      if (trimmedName) {
        doc.setFontSize(12);
        doc.text(trimmedName, margin, y);
        y += 24;
      }

      doc.setFontSize(16);
      doc.text(uiText[language].yourResults, pageWidth / 2, y, { align: 'center' });

      y += 24;
      doc.setFontSize(10);
      doc.text(
        `${uiText[language].overallScore}: ${results.overallScore} / ${results.overallMax} (${results.interpretation})`,
        margin,
        y
      );

      y += 10;
      const barWidth = contentWidth;
      const barHeight = 10;
      const drawBar = (percent, color) => {
        doc.setFillColor(200, 200, 200);
        doc.roundedRect(margin + 2, y + 2, barWidth, barHeight, 3, 3, 'F');
        doc.setFillColor(240, 240, 240);
        doc.roundedRect(margin, y, barWidth, barHeight, 3, 3, 'F');
        doc.setFillColor(color[0], color[1], color[2]);
        doc.roundedRect(margin, y, barWidth * percent, barHeight, 3, 3, 'F');
        y += barHeight + 16;
      };

      drawBar(results.overallScore / results.overallMax, [54, 162, 235]);

      const facetDescriptions = {
        Responsibility:
          "This facet captures a person's felt moral obligation toward people and problems beyond their own borders. Someone who scores high here experiences a \u201cdeep personal concern\u201d for global inequities and believes they ought to help relieve them, whether that means supporting human-rights campaigns, adjusting lifestyle choices to cut carbon, or advocating for fairer trade.",
        CulturalPluralism:
          'Global-minded individuals also prize diversity as an authentic good. The pluralism sub-scale gauges curiosity about unfamiliar customs, comfort with ambiguity, and the conviction that every culture \u201ccontributes something of value to the world.\u201d Rather than merely tolerating difference, it frames intercultural contact as a source of learning and mutual enrichment.',
        Efficacy:
          "Feeling responsible is only half the story; this dimension measures confidence that one\u2019s actions can matter. It taps an internalised sense of agency\u2014belief that writing to a legislator, mentoring a refugee, or changing consumption habits will, in aggregate, shift outcomes. High-efficacy respondents typically translate global concern into concrete initiatives because they assume their efforts are consequential.",
        Interconnectedness:
          'Finally, the scale explores how strongly a person perceives humanity\u2019s web of social, economic and ecological linkages. High scores reflect an \u201cappreciation for and awareness of the way in which all people from all nations are connected,\u201d from supply chains and digital media to shared climate systems and pandemics. This worldview encourages thinking in terms of ripple effects and mutual dependence rather than isolated national interests.',
      };

      Object.entries(results.categoryScores)
        .filter(([key]) => !key.includes('Max'))
        .forEach(([category, score]) => {
          const max = results.categoryScores[`${category}Max`];
          const percentage = score / max;

          doc.setFontSize(11);
          doc.text(
            `${fullSurveyData.categoryLabels[language][category]}: ${score} / ${max}`,
            margin,
            y
          );
          y += 11;
          doc.setFontSize(9);
          const descLines = doc.splitTextToSize(
            facetDescriptions[category],
            barWidth
          );
          doc.text(descLines, margin, y);
          y += descLines.length * 9 + 3;
          doc.setFontSize(11);
          drawBar(percentage, [34, 197, 94]);
        });

      const safeName = trimmedName ? trimmedName.replace(/\s+/g, '_') : 'GMS_results';
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
              setLanguage(e.target.value);
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
              {uiText[language].overallScore}: <strong>{results.overallScore} / {results.overallMax}</strong> ({results.interpretation})
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
                {Object.entries(results.categoryScores).filter(([key]) => !key.includes("Max")).map(([category, score]) => {
                  const max = results.categoryScores[`${category}Max`];
                  const percentage = (score / max) * 100;
                  return (
                    <li key={category}>
                      <p className="mb-1 text-gray-700">
                        <strong>{fullSurveyData.categoryLabels[language][category]}:</strong> {score} / {max}
                      </p>
                      <p className="mb-2 text-sm text-gray-500 italic">{fullSurveyData.categoryDescriptions[language][category]}</p>
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
              <p className="mb-8 text-xl text-gray-800 text-center">{fullSurveyData.questions[language][currentQuestion]}</p>
              <div className="flex flex-col gap-4">
                {fullSurveyData.scaleDescriptors[language].map((desc, idx) => (
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

