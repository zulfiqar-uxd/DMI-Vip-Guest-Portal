import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/router";

const ItSupport = () => {
  const [language, setLanguage] = useState("en");
  const [selectedService, setSelectedService] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

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

  const handleServiceSelect = (event) => {
    setSelectedService(event.target.value);
  };

  const handlePingSupport = () => {
    if (selectedService) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 3000);
    } else {
      alert(
        language === "ar" ? "يرجى اختيار خدمة." : "Please select a service."
      );
    }
  };

  const services = [
    { id: 1, name: { en: "Internet Issue", ar: "مشكلة في الإنترنت" } },
    { id: 2, name: { en: "Printer Issue", ar: "مشكلة في الطابعة" } },
    { id: 3, name: { en: "Software Installation", ar: "تثبيت البرامج" } },
    { id: 4, name: { en: "Hardware Issue", ar: "مشكلة في الأجهزة" } },
  ];

  return (
    <div className="bg-[#FFFAF4] h-screen">
      <Header language={language} onLanguageToggle={toggleLanguage} />
      <main className="px-8 md:px-24 p-6">
        {/* Breadcrumbs */}
        <div
          className="flex items-center gap-2 mb-8"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <a href="/" className="text-dmiRed1 font-medium hover:underline">
            {language === "ar" ? "الرئيسية" : "Home"}
          </a>
          <span className="text-gray-500">{">"}</span>
          <span className="text-gray-500 font-medium">
            {language === "ar" ? "الدعم الفني" : "Technical Support"}
          </span>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-700 mb-6">
            {language === "ar" ? "الدعم الفني" : "Technical Support"}
          </h1>
          <p className="text-gray-600 mb-6">
            {language === "ar"
              ? "اختر خدمة الدعم الفني التي تحتاجها."
              : "Select the IT support service you need."}
          </p>

          <div className="mb-6">
            <select
              value={selectedService}
              onChange={handleServiceSelect}
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              <option value="">
                {language === "ar"
                  ? "اختر خدمة الدعم الفني"
                  : "Select a support service"}
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name[language]}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handlePingSupport}
            className="px-6 py-3 bg-dmiRed1 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            {language === "ar" ? "طلب المساعدة" : "Ping for Support"}
          </button>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-dmiRed1 mb-4">
              {language === "ar"
                ? "تم إرسال طلبك!"
                : "Your request has been sent!"}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === "ar"
                ? "سيقوم أحد موظفينا بمساعدتك قريبًا."
                : "A staff member will assist you shortly."}
            </p>
            <p className="text-sm text-gray-400">
              {language === "ar"
                ? "سيتم إعادتك إلى الصفحة الرئيسية قريبًا."
                : "You will be redirected to the homepage shortly."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItSupport;
