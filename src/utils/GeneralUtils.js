import { useState, useEffect } from "react";

const GeneralUtils = () => {
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    setLanguage(savedLanguage || "en");
  }, []);

  useEffect(() => {
    if (language) {
      localStorage.setItem("language", language);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
  };

  return { language, toggleLanguage };
};

export default GeneralUtils;
