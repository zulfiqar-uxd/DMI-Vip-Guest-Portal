import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const GeneralUtils = () => {
  const [language, setLanguage] = useState("en");
  const router = useRouter();

  useEffect(() => {
    const savedChairId = localStorage.getItem("ChairId");
    if (!savedChairId) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
  };

  return { language, setLanguage, toggleLanguage };
};

export default GeneralUtils;
