import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/landingPage";
import Auth from "./Pages/Auth";

function App() {
  return (
    <div className="h-screen w-screen flex items-center  justify-center">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
