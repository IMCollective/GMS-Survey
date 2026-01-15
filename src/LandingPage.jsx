const landingText = {
  en: {
    title: "Welcome to the Global Mindedness Survey",
    description:
      "This short questionnaire measures your attitudes about global citizenship and cultural understanding.",
    button: "Start Survey",
    aboutTitle: "About the Survey",
    aboutText:
      "This survey explores your views on global citizenship to promote worldwide awareness.",
    privacyTitle: "Privacy / Consent",
    privacyText:
      "Responses are anonymous and used only for educational purposes. By continuing, you consent to this data use.",
  },
  zh: {
    title: "欢迎参加全球意识调查",
    description: "这份简短的问卷评估你对全球公民意识和文化理解的态度。",
    button: "开始调查",
    aboutTitle: "关于调查",
    aboutText: "此调查旨在了解你对全球公民意识的看法，以促进全球意识。",
    privacyTitle: "隐私 / 同意",
    privacyText: "所有回答均匿名，仅用于教育目的。继续即表示你同意使用这些数据。",
  },
  fr: {
    title: "Bienvenue au sondage sur l'ouverture au monde",
    description:
      "Ce court questionnaire mesure vos attitudes envers la citoyenneté mondiale et la compréhension culturelle.",
    button: "Commencer le sondage",
    aboutTitle: "À propos du sondage",
    aboutText:
      "Ce sondage explore vos points de vue sur la citoyenneté mondiale afin de promouvoir une sensibilisation mondiale.",
    privacyTitle: "Confidentialité / Consentement",
    privacyText:
      "Les réponses sont anonymes et utilisées uniquement à des fins éducatives. En continuant, vous consentez à cette utilisation des données.",
  },
  es: {
    title: "Bienvenido a la Encuesta de Mentalidad Global",
    description:
      "Este breve cuestionario mide tus actitudes sobre la ciudadanía global y la comprensión cultural.",
    button: "Iniciar encuesta",
    aboutTitle: "Acerca de la encuesta",
    aboutText:
      "Esta encuesta explora tus opiniones sobre la ciudadanía global para promover la conciencia mundial.",
    privacyTitle: "Privacidad / Consentimiento",
    privacyText:
      "Las respuestas son anónimas y se usan solo con fines educativos. Al continuar, das tu consentimiento para este uso de datos.",
  },
};

export default function LandingPage({ onStart, language, setLanguage }) {
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{landingText[language].title}</h1>
      <p className="text-lg mb-6 text-gray-700">{landingText[language].description}</p>
      <div className="mb-4">
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
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-3 px-8 rounded-2xl shadow-lg"
        onClick={onStart}
      >
        {landingText[language].button}
      <div className="mt-8 text-left">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          {landingText[language].aboutTitle}
        </h2>
        <p className="text-gray-700 mb-4">{landingText[language].aboutText}</p>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          {landingText[language].privacyTitle}
        </h2>
        <p className="text-gray-700">{landingText[language].privacyText}</p>
      </div>
