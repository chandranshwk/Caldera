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

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const syncAuth = async () => {
      // getUser() forces a server-side check and is better at catching redirects
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // If user exists, ensure session is synced to your custom token
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
        // This is critical for catching the redirect event
        if (window.location.pathname === "/auth") {
          toast.success("Logged In Successfully");
          navigate("/home");
        }
      } else if (event === "SIGNED_OUT") {
        localStorage.removeItem("token");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const root = window.document.documentElement;
    const body = document.body;

    if (darkMode) {
      // Matte Dark
      root.style.backgroundColor = "#212122";
      body.style.backgroundColor = "#212122";
      root.classList.add("dark");
    } else {
      // Light
      root.style.backgroundColor = "#ffffff";
      body.style.backgroundColor = "#fafafa";
      root.classList.remove("dark");
    }

    // Keep localStorage in sync so the index.html script works on next reload
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <>
      <ToastContainer
        theme={darkMode ? "dark" : "light"}
        position="bottom-right"
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<LandingPage />} />
        <Route element={<PrivateRoute darkMode={darkMode} />}>
          <Route
            path="/home"
            element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route path="/forge" element={<Forge darkMode={darkMode} />}>
            <Route index path="dashboard" element={<FDashboard />} />
            <Route path="docs" element={<FDoc />} />
            <Route path="sheets" element={<FSheets />} />
          </Route>
          <Route path="/nexus" element={<Nexus darkMode={darkMode} />}>
            <Route index path="dashboard" element={<NDashboard />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="manage" element={<NManage />} />
          </Route>
          <Route path="/hearth" element={<Hearth darkMode={darkMode} />}>
            <Route index path="dashboard" element={<HDashboard />} />
            <Route path="personal" element={<Personal />} />
            <Route path="channels" element={<Channels />} />
          </Route>
          <Route path="/canvas" element={<Canvas darkMode={darkMode} />}>
            <Route index path="dashboard" element={<CDashboard />} />
            <Route path="new" element={<CNew />} />
            <Route path="viewAll" element={<CViewAll />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
