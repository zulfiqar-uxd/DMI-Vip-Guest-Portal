import GeneralUtils from "@/utils/GeneralUtils";
import { useRouter } from "next/router";

const App = () => {
  const { language, toggleLanguage } = GeneralUtils();
  const router = useRouter();

  const texts = {
    en: {
      title: "Hello!",
      subtitle: "Press for Services",
      toggle: "ع",
    },
    ar: {
      title: "مرحباً",
      subtitle: "اضغط هنا للخدمات",
      toggle: "E",
    },
  };

  const handleClick = () => {
    router.push("/home");
  };

  if (!language) return <div></div>;

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-[url(/images/bg-banner.png)] bg-contain bg-center bg-no-repeat ${
        language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleLanguage();
        }}
        aria-label={
          language === "en" ? "Switch to Arabic" : "Switch to English"
        }
        className="absolute top-4 right-4 bg-[#D5202F] text-white py-2 px-4 rounded-full shadow-md hover:opacity-90 z-10"
      >
        {texts[language].toggle}
      </button>

      {/* Main Content */}
      <main
        className="flex flex-col items-center justify-center text-center cursor-pointer"
        onClick={handleClick}
      >
        <div className="w-64 h-64 text-white flex flex-col items-center justify-center">
          <h1 className="text-8xl font-bold">{texts[language].title}</h1>
          <p className="text-2xl font-normal mt-2">
            {texts[language].subtitle}
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
