import GeneralUtils from "@/utils/GeneralUtils";

const Home = () => {
  const { language } = GeneralUtils();
  const services = [
    {
      id: 1,
      title: "Wi-Fi",
      icon: "/icons/wifi-icon.svg",
      link: "/wifi",
    },
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
  ];

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Background Images */}
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

      {/* Main Content */}
      <main className="z-10 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {services.map((service) => (
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
