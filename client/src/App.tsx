import { useMediaQuery } from "./hooks/useMediaQuery";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "./lib/supabase";

// Pages
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import ProjectView from "./Pages/ProjectView";

// Forge
import Forge from "./Pages/Forge/Forge";
import FDashboard from "./Pages/Forge/FDashboard";
import FDoc from "./Pages/Forge/FDoc";
import FSheets from "./Pages/Forge/FSheets";
import FPdfs from "./Pages/Forge/FPdfs";

// Nexus
import Nexus from "./Pages/Nexus/Nexus";
import NDashboard from "./Pages/Nexus/NDashboard";
import Calendar from "./Pages/Nexus/Calendar";
import NManage from "./Pages/Nexus/NManage";

// Hearth
import Hearth from "./Pages/Hearth/Hearth";
import HDashboard from "./Pages/Hearth/HDashboard";
import Personal from "./Pages/Hearth/Personal";
import Channels from "./Pages/Hearth/Channels";

//Strata
import Strata from "./Pages/Strata/Strata";
import SDashboard from "./Pages/Strata/SDashboard";
import SNew from "./Pages/Strata/SNew";

// Components & Routes
import PrivateRoute from "./Routes/privateRoute";
import CommandBar from "./components/CommandBar";
import "./App.css";
import type { User } from "@supabase/supabase-js";
import ForgeView from "./Pages/Forge/ForgeView";
import ForgeViewSheets from "./Pages/Forge/ForgeViewSheets";
import { LuMonitor } from "react-icons/lu";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);
  const [openCommandBar, setOpenCommandBar] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  // --- AUTHENTICATION LOGIC ---
  useEffect(() => {
    // 1. Initial Session Check
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        localStorage.setItem("token", session.access_token);
      }
    };
    getInitialSession();

    // 2. Listen for Auth Changes (Login, Logout, Signup)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        localStorage.setItem("token", session.access_token);

        if (window.location.pathname === "/auth") {
          const name = session.user.user_metadata?.full_name || "User";
          toast.success(`Welcome back, ${name}`);
          navigate("/profile");
        }
      } else {
        setUser({} as User);
        localStorage.removeItem("token");
        if (event === "SIGNED_OUT") navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // --- DARK MODE LOGIC ---
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.style.backgroundColor = "#212122";
      document.body.style.backgroundColor = "#212122";
      root.classList.add("dark");
    } else {
      root.style.backgroundColor = "#ffffff";
      document.body.style.backgroundColor = "#fafafa";
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // --- COMMAND BAR SHORTCUT ---
  useEffect(() => {
    const handleCommands = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenCommandBar((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleCommands);
    return () => window.removeEventListener("keydown", handleCommands);
  }, []);

  const isMobile = useMediaQuery("(max-width: 1024px)"); // Set threshold for tablet/mobile

  if (isMobile) {
    return <MobileRestriction />;
  }

  return (
    <>
      <ToastContainer
        theme={darkMode ? "dark" : "light"}
        position="bottom-right"
        autoClose={3000}
      />

      {openCommandBar && (
        <CommandBar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isOpen={openCommandBar}
          onClose={() => setOpenCommandBar(false)}
        />
      )}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />

        {/* PRIVATE ROUTES */}
        {/* Note: Pass 'user' into context if your PrivateRoute/Shell uses OutletContext */}
        <Route element={<PrivateRoute darkMode={darkMode} user={user} />}>
          <Route
            path="/profile"
            element={
              <Home user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          />

          <Route
            path="/project/:projectId"
            element={<ProjectView user={user} darkMode={darkMode} />}
          />

          <Route
            path="/forge/doc/open/:projectId"
            element={<ForgeView darkMode={darkMode} />}
          />
          <Route
            path="/forge/sheet/open/:projectId"
            element={<ForgeViewSheets darkMode={darkMode} />}
          />

          {/* Module: The Forge */}
          <Route
            path="/forge"
            element={<Forge user={user} darkMode={darkMode} />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<FDashboard />} />
            <Route path="docs" element={<FDoc />} />
            <Route path="sheets" element={<FSheets />} />
            <Route path="pdfs" element={<FPdfs />} />
          </Route>

          {/* Module: The Nexus */}
          <Route
            path="/nexus"
            element={<Nexus user={user} darkMode={darkMode} />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<NDashboard />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="manage" element={<NManage />} />
          </Route>

          {/* Module: The Hearth */}
          <Route
            path="/hearth"
            element={<Hearth user={user} darkMode={darkMode} />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<HDashboard />} />
            <Route path="personal" element={<Personal />} />
            <Route path="channels" element={<Channels />} />
          </Route>

          {/* Module: The Strata */}
          <Route
            path="/Strata"
            element={<Strata user={user} darkMode={darkMode} />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<SDashboard />} />
            <Route path="new" element={<SNew />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

const MobileRestriction = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center p-6 text-center antialiased bg-app-bg text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
    {/* Background Decorative Element */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 bg-blue-300 dark:bg-blue-600/30" />
    </div>

    {/* Main Card */}
    <div className="relative max-w-sm w-full p-8 py-12 rounded-[2.5rem] border backdrop-blur-xl shadow-(--shadow-card) border-app-border bg-app-card) transition-all">
      <div className="space-y-8">
        {/* Icon Container */}
        <div className="relative mx-auto w-20 h-20">
          <div className="relative w-full h-full rounded-4xl flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-app-icon-bg shadow-sm">
            <LuMonitor size={32} className="text-zinc-900 dark:text-zinc-100" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight italic">
            Desktop Only
          </h1>
          <p className="text-[15px] leading-relaxed px-4 text-zinc-500 dark:text-zinc-400">
            Caldera is a high-performance workstation optimized for large
            screens. Please switch to a{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              desktop browser
            </span>{" "}
            to access your workspace.
          </p>
        </div>

        {/* Status Footer */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <div className="h-px w-10 bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
              Caldera OS v1.0.4
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
