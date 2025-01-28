import GeneralUtils from "@/utils/GeneralUtils";

const Home = () => {
  const { language, toggleLanguage } = GeneralUtils();

  const texts = {
    en: {
      services: [
        { id: 1, title: "Wi-Fi", icon: "/icons/wifi-icon.svg", link: "/wifi" },
        {
          id: 2,
          title: "Hospitality",
          icon: "/icons/cafe-icon.svg",
          link: "/cafe-order",
        },
        {
          id: 3,
          title: "IT Support",
          icon: "/icons/support-icon.svg",
          link: "/support",
        },
      ],
      toggle: "ع",
    },
    ar: {
      services: [
        {
          id: 1,
          title: "الانترنت",
          icon: "/icons/wifi-icon.svg",
          link: "/wifi",
        },
        {
          id: 2,
          title: "الضيافة",
          icon: "/icons/cafe-icon.svg",
          link: "/cafe-order",
        },
        {
          id: 3,
          title: "الدعم",
          icon: "/icons/support-icon.svg",
          link: "/support",
        },
      ],
      toggle: "E",
    },
  };

  if (!language) {
    return <div></div>;
  }

  return (
    <div
      className={`relative min-h-screen bg-white flex flex-col items-center justify-center ${
        language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <img
        src="/images/bg-banner-half.png"
        alt="Left Background"
        className="absolute top-0 left-0 h-full rotate-180"
      />
      <img
        src="/images/bg-banner-half.png"
        alt="Right Background"
        className="absolute top-0 right-0 h-full"
      />

      {/* Language Toggle Button */}
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
      <main className="z-10 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {texts[language].services.map((service) => (
            <a
              key={service.id}
              href={service.link}
              className="flex flex-col items-center justify-center bg-[#D5202F] text-white py-10 px-8 rounded-[70px] hover:opacity-90 transition-opacity"
            >
              <img
                src={service.icon}
                alt={service.title}
                className="w-36 h-w-36 mb-2"
              />
              <p className="text-center text-lg font-medium">{service.title}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
