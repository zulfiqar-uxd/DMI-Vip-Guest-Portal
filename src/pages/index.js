import GeneralUtils from "@/utils/GeneralUtils";
import { useRouter } from "next/router";

const Home = () => {
  const { language } = GeneralUtils();
  const router = useRouter();

  const handleClick = () => {
    router.push("/home");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[url(/images/bg-banner.png)] bg-contain bg-center bg-no-repeat"
      onClick={handleClick}
    >
      <main className="flex flex-col items-center justify-center text-center">
        <div className="w-64 h-64 rounded-full text-white flex flex-col items-center justify-center">
          <h1 className="text-8xl font-bold">Hello!</h1>
          <p className="text-2xl font-normal mt-2">Press for Services</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
