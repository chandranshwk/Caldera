import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./Pages/Auth";
import { toast, ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import PrivateRoute from "./Routes/privateRoute";
import { supabase } from "./lib/supabase";
import { useEffect, useState } from "react";
import Forge from "./Pages/Forge/Forge";
import Nexus from "./Pages/Nexus/Nexus";
import Hearth from "./Pages/Hearth/Hearth";
import Canvas from "./Pages/Canvas/Canvas";
import FDashboard from "./Pages/Forge/FDashboard";
import FDoc from "./Pages/Forge/FDoc";
import FSheets from "./Pages/Forge/FSheets";
import NDashboard from "./Pages/Nexus/NDashboard";
import Calendar from "./Pages/Nexus/Calendar";
import NManage from "./Pages/Nexus/NManage";
import Personal from "./Pages/Hearth/Personal";
import Channels from "./Pages/Hearth/Channels";
import CDashboard from "./Pages/Canvas/CDashboard";
import CNew from "./Pages/Canvas/CNew";
import CViewAll from "./Pages/Canvas/CViewAll";
import HDashboard from "./Pages/Hearth/HDashboard";
import LandingPage from "./Pages/LandingPage";
import FPdfs from "./Pages/Forge/FPdfs";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const syncAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          localStorage.setItem("token", session.access_token);
        }
      }
    };
    syncAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem("token", session.access_token);
        // REDIRECT FIX: If user logs in successfully, send them to the internal dashboard
        if (window.location.pathname === "/auth") {
          toast.success("Logged In Successfully");
          navigate("/dashboard");
        }
      } else if (event === "SIGNED_OUT") {
        localStorage.removeItem("token");
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = document.body;

    if (darkMode) {
      root.style.backgroundColor = "#212122";
      body.style.backgroundColor = "#212122";
      root.classList.add("dark");
    } else {
      root.style.backgroundColor = "#ffffff";
      body.style.backgroundColor = "#fafafa";
      root.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <>
      <ToastContainer
        theme={darkMode ? "dark" : "light"}
        position="bottom-right"
        autoClose={3000}
      />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />

        {/* PRIVATE ROUTES (Protected by Shell) */}
        <Route element={<PrivateRoute darkMode={darkMode} />}>
          {/* Internal Home / Dashboard */}
          <Route
            path="/dashboard"
            element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          {/* Module: The Forge */}
          <Route path="/forge" element={<Forge darkMode={darkMode} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route
              path="dashboard"
              element={<FDashboard darkMode={darkMode} />}
            />
            <Route path="docs" element={<FDoc darkMode={darkMode} />} />
            <Route path="sheets" element={<FSheets />} />
            <Route path="pdfs" element={<FPdfs />} />
          </Route>

          {/* Module: The Nexus */}
          <Route path="/nexus" element={<Nexus darkMode={darkMode} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<NDashboard />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="manage" element={<NManage />} />
          </Route>

          {/* Module: The Hearth */}
          <Route path="/hearth" element={<Hearth darkMode={darkMode} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<HDashboard />} />
            <Route path="personal" element={<Personal />} />
            <Route path="channels" element={<Channels />} />
          </Route>

          {/* Module: The Canvas */}
          <Route path="/canvas" element={<Canvas darkMode={darkMode} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<CDashboard />} />
            <Route path="new" element={<CNew />} />
            <Route path="viewAll" element={<CViewAll />} />
          </Route>
        </Route>

        {/* CATCH-ALL REDIRECT */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
