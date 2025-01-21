import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [chairId, setChairId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedChairId = localStorage.getItem("chairId");
    if (savedChairId) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = () => {
    if (password !== "DMI123") {
      setError("كلمة المرور غير صحيحة.");
      return;
    }

    localStorage.setItem("ChairId", "CH" + chairId);
    router.push("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-[#FFFAF4] min-h-screen flex flex-col items-center justify-center">
      <main className="w-full max-w-md px-8 md:px-24 py-12 bg-white shadow-lg rounded-3xl border">
        <h1 className="text-center text-2xl font-semibold text-dmiGray1 mb-6">
          Chair Profile
        </h1>

        {error && (
          <p className="text-center text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="flex flex-col mb-4">
          <label
            className="text-sm font-medium text-gray-700 mb-2"
            htmlFor="chairId"
          >
            Chair ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="chairId"
              value="CH"
              className="w-14 text-sm px-4 py-2 border rounded-lg"
              disabled
            />
            <input
              type="text"
              id="chairId"
              value={chairId}
              onChange={(e) => setChairId(e.target.value)}
              placeholder="Enter Chair ID"
              className="w-full text-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-200"
            />
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <label
            className="text-sm font-medium text-gray-700 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Test Pass : DMI123"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-200"
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 mt-4 bg-dmiRed2 text-white rounded-lg hover:bg-dmiRed1 focus:ring-2 focus:ring-offset-2 focus:ring-dmiRed1"
        >
          Create Profile
        </button>
      </main>
    </div>
  );
};

export default Login;
