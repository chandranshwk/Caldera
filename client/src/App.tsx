import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/landingPage";
import Auth from "./Pages/Auth";
import { toast, ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import PrivateRoute from "./Routes/privateRoute";
import { supabase } from "./lib/supabase";
import { useEffect } from "react";

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

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
