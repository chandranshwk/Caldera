import { FiSun, FiMoon } from "react-icons/fi"; // Using Feather icons for the Apple look

interface HomeProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Home = ({ darkMode, setDarkMode }: HomeProps) => {
  return (
    <div
      className={`h-full w-[calc(100%-0.4rem)] p-6 transition-all duration-300 border ${
        darkMode
          ? "bg-zinc-900 border-zinc-800 text-white"
          : "bg-white border-slate-100 text-slate-900"
      } shadow-sm`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Global Dashboard</h1>

        {/* The Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-colors ${
            darkMode
              ? "bg-zinc-800 hover:bg-zinc-700 text-orange-400"
              : "bg-slate-50 hover:bg-slate-100 text-slate-600"
          }`}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Home;
