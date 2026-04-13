import type { User } from "@supabase/supabase-js";
import { FiSun, FiMoon, FiLogOut } from "react-icons/fi";

interface HomeProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  user: User;
}

const Home: React.FC<HomeProps> = ({ darkMode, setDarkMode }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div
      className={`h-full w-[calc(100%-0.4rem)] p-6 transition-all duration-300 border ${
        darkMode
          ? "bg-zinc-900 border-zinc-800 text-white"
          : "bg-white border-slate-100 text-slate-900"
      } shadow-sm`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Global Dashboard</h1>

          {/* Subtle Ctrl+K Hint */}
          <div
            className={`hidden md:flex items-center gap-1.5 px-2 py-1 rounded border text-[10px] font-medium opacity-50 ${
              darkMode
                ? "border-zinc-700 bg-zinc-800"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <span>Press</span>
            <kbd className="font-sans">Ctrl</kbd>
            <span>+</span>
            <kbd className="font-sans">K</kbd>
            <span>for commands</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
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

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
              darkMode
                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                : "bg-red-50 text-red-600 hover:bg-red-100"
            }`}
            title="Log Out"
          >
            <FiLogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
