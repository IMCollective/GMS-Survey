import React from "react";
const content = {
  en: {
    title: "Welcome to the Global Mindedness Survey",
    intro:
      "This short questionnaire invites you to reflect on your perspectives as a global citizen. Adapted from Hett’s Global Mindedness Scale, the survey is designed to measure how you view the world, your sense of interconnectedness with others, and your openness to cultural diversity.",
    body:
      "By completing the survey, you’ll gain insights into your attitudes and beliefs across four key dimensions of global mindedness:",
    dimensions: [
      {
        name: "Responsibility",
        desc:
          "the degree to which you see yourself as accountable for the well-being of people and the planet.",
      },
      {
        name: "Cultural Pluralism",
        desc: "your appreciation of and respect for cultural diversity.",
      },
      {
        name: "Globalcentrism",
        desc:
          "how strongly you identify as a member of a global community beyond local or national boundaries.",
      },
      {
        name: "Efficacy",
        desc: "your confidence in being able to make a positive difference in the world.",
      },
    ],
    outro: [
      "The survey is not a test, but a self-reflective tool. It can help you better understand your own mindset and how it relates to global citizenship, intercultural understanding, and social responsibility.",
      "Take a few minutes to complete the survey and explore your results-you may discover new perspectives on how you connect with the wider world.",
    ],
    start: "Start Survey",
  },
  zh: {
    title: "欢迎参加全球思维调查",
    intro:
      "这份简短的问卷邀请你以全球公民的身份反思自己的观点。该调查改编自Hett的全球思维量表，旨在衡量你如何看待世界、与你人与他者之间的互联感，以及你对文化多样性的开放程度。",
    body:
      "通过完成调查，你将了解自己在全球思维的四个关键维度上的态度与信念：",
    dimensions: [
      { name: "责任感", desc: "你在多大程度上认为自己对人类和地球的福祉负有责任。" },
      { name: "文化多元", desc: "你对文化多样性的欣赏与尊重。" },
      {
        name: "全球中心主义",
        desc: "你在多大程度上把自己视为超越地方或国家边界的全球共同体成员。",
      },
      { name: "效能感", desc: "你相信自己能够为世界带来积极改变的信心。" },
    ],
    outro: [
      "该调查不是考试，而是自我反思的工具。它可以帮助你更好地理解自己的思维方式，以及它如何与全球公民意识、跨文化理解和社会责任相关。",
      "花几分钟完成调查并探索你的结果-你可能会发现自己与更广阔世界相联的新视角。",
    ],
    start: "开始调查",
  },
  fr: {
    title: "Bienvenue au Global Mindedness Survey",
    intro:
      "Ce court questionnaire vous invite à réfléchir à vos perspectives en tant que citoyen du monde. Adapté de l’échelle de global mindedness de Hett, le sondage est conçu pour mesurer votre vision du monde, votre sentiment d’interconnexion avec les autres et votre ouverture à la diversité culturelle.",
    body:
      "En complétant le sondage, vous obtiendrez un aperçu de vos attitudes et croyances selon quatre dimensions clés de la pensée globale :",
    dimensions: [
      {
        name: "Responsabilité",
        desc:
          "le degré auquel vous vous sentez responsable du bien-être des personnes et de la planète.",
      },
      {
        name: "Pluralisme culturel",
        desc: "votre appréciation et votre respect de la diversité culturelle.",
      },
      {
        name: "Globalcentrisme",
        desc:
          "la force avec laquelle vous vous identifiez en tant que membre d’une communauté mondiale au-delà des frontières locales ou nationales.",
      },
      {
        name: "Efficacité",
        desc: "votre confiance en votre capacité à faire une différence positive dans le monde.",
      },
    ],
    outro: [
      "Ce sondage n’est pas un test, mais un outil d’autoréflexion. Il peut vous aider à mieux comprendre votre propre état d’esprit et sa relation avec la citoyenneté mondiale, la compréhension interculturelle et la responsabilité sociale.",
      "Prenez quelques minutes pour répondre au sondage et explorer vos résultats - vous pourriez découvrir de nouvelles perspectives sur votre façon de vous relier au reste du monde.",
    ],
    start: "Commencer l'enquête",
  },
  es: {
    title: "Bienvenido a la Encuesta de Mentalidad Global",
    intro:
      "Este breve cuestionario te invita a reflexionar sobre tus perspectivas como ciudadano global. Adaptada de la escala de global mindedness de Hett, la encuesta está diseñada para medir cómo ves el mundo, tu sentido de interconexión con los demás y tu apertura a la diversidad cultural.",
    body:
      "Al completar la encuesta, obtendrás información sobre tus actitudes y creencias en cuatro dimensiones clave de la mentalidad global:",
    dimensions: [
      {
        name: "Responsabilidad",
        desc:
          "el grado en que te consideras responsable del bienestar de las personas y del planeta.",
      },
      {
        name: "Pluralismo cultural",
        desc: "tu aprecio y respeto por la diversidad cultural.",
      },
      {
        name: "Globalcentrismo",
        desc:
          "qué tan fuertemente te identificas como miembro de una comunidad global más allá de las fronteras locales o nacionales.",
      },
      {
        name: "Eficacia",
        desc: "tu confianza en poder generar un cambio positivo en el mundo.",
      },
    ],
    outro: [
      "La encuesta no es una prueba, sino una herramienta de autorreflexión. Puede ayudarte a comprender mejor tu propia mentalidad y cómo se relaciona con la ciudadanía global, la comprensión intercultural y la responsabilidad social.",
      "Tómate unos minutos para completar la encuesta y explorar tus resultados; quizá descubras nuevas perspectivas sobre cómo te conectas con el mundo.",
    ],
    start: "Comenzar encuesta",
  },
};
export default function LandingPage({ onStart, language, setLanguage }) {
  const t = content[language];
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl mt-10 text-center border border-gray-200">
      <div className="mb-4 text-right">
        <select
          className="border p-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="zh">中文</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
        </select>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{t.title}</h1>
      <p className="text-lg mb-4 text-gray-700">{t.intro}</p>
      <p className="text-lg mb-4 text-gray-700">{t.body}</p>
      <ul className="text-left list-disc list-inside mb-4 text-gray-700">
        {t.dimensions.map((d) => (
          <li key={d.name} className="mb-2">
            <strong>{d.name}</strong> - {d.desc}
          </li>
        ))}
      </ul>
      {t.outro.map((p, i) => (
        <p key={i} className="text-lg mb-4 text-gray-700">
          {p}
        </p>
      ))}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-3 px-8 rounded-2xl shadow-lg"
        onClick={onStart}
      >
        {t.start}

