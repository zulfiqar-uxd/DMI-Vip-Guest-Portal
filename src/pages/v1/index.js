import Header from "@/components/Header";
import GeneralUtils from "@/utils/GeneralUtils";

const Home = () => {
  const { language, toggleLanguage } = GeneralUtils();

  const data = {
    services: [
      {
        id: 1,
        title: { en: "Food & Beverages", ar: "الأطعمة والمشروبات" },
        icon: "/icons/coffee.svg",
        link: "/cafe-order",
      },
      {
        id: 2,
        title: { en: "WiFi", ar: "الواي فاي" },
        icon: "/icons/wifi.svg",
        link: "/connect-wifi",
      },
      {
        id: 3,
        title: { en: "Technical Support", ar: "الدعم الفني" },
        icon: "/icons/support.svg",
        link: "/it-support",
      },
      {
        id: 4,
        title: { en: "Valet Parking", ar: "صف السيارات" },
        icon: "/icons/car.svg",
        link: "/valet-parking",
      },
    ],
    trackRequest: {
      text: { en: "Track my Requests", ar: "تتبع طلباتي" },
      icon: "/icons/arrowRightFill.svg",
      link: "/track-order",
    },
    greeting: {
      en: "Hello",
      ar: "مرحبا",
    },
    welcomeMessage: {
      en: "Welcome To DMI",
      ar: "مرحبًا بكم في دبي للإعلام",
    },
  };

  const { greeting, welcomeMessage, services, trackRequest } = data;

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(0deg, #E3C8AA 0%, #FFEFEF 100%)" }}
    >
      <Header language={language} onLanguageToggle={toggleLanguage} />
      <main
        className={`container mx-auto p-6 text-center h-[85vh] flex flex-col items-center justify-center ${
          language === "ar" ? "rtl" : "ltr"
        }`}
      >
        <h1 className="text-6xl select-none font-medium text-dmiRed2">
          {greeting[language]}
        </h1>
        <p className="mt-2 select-none font-normal text-[#444444] text-2xl">
          {welcomeMessage[language]}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.link}
              className="flex flex-col items-center justify-center px-4 py-6 bg-[#FFEEDA] border border-[#FFBEC0] rounded-lg cursor-pointer shadow-[inset_13.119px_26.237px_65.593px_rgba(255,255,255,0.8),_0px_3.28px_6.559px_rgba(255,0,0,0.1)] select-none hover:border-dmiRed2 hover:bg-[#fff4e8] active:opacity-80"
            >
              <img
                src={service.icon}
                alt={service.title[language]}
                className="w-[60px] h-[60px]"
              />
              <p className="mt-4 text-sm text-[#444444] font-medium">
                {service.title[language]}
              </p>
            </a>
          ))}
        </div>
        <div className="flex items-center justify-center mt-12">
          <a
            href={trackRequest.link}
            className="flex items-center gap-5 pr-3 pl-6 py-4 text-sm font-medium text-[#444444] bg-[#FFEEDA] border border-[#FFBEC0] rounded-full shadow-[0px_3.346px_3.346px_rgba(255,0,0,0.08)] select-none hover:border-dmiRed2 hover:bg-[#fff4e8] active:opacity-80"
          >
            <span>{trackRequest.text[language]}</span>
            <img src={trackRequest.icon} alt="Arrow" className="w-10 h-10" />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
