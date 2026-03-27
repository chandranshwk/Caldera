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

// Canvas
import Canvas from "./Pages/Canvas/Canvas";
import CDashboard from "./Pages/Canvas/CDashboard";
import CNew from "./Pages/Canvas/CNew";
import CViewAll from "./Pages/Canvas/CViewAll";

// Components & Routes
import PrivateRoute from "./Routes/privateRoute";
import CommandBar from "./components/CommandBar";
import "./App.css";
import type { User } from "@supabase/supabase-js";

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

          {/* Module: The Canvas */}
          <Route
            path="/canvas"
            element={<Canvas user={user} darkMode={darkMode} />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<CDashboard />} />
            <Route path="new" element={<CNew />} />
            <Route path="viewAll" element={<CViewAll />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
