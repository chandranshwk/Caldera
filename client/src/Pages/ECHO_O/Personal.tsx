import { useOutletContext } from "react-router-dom";
import SideView from "./SideView";
import TopDock from "./TopDock";
import { useState } from "react";
import { motion } from "framer-motion"; // Import motion
import ChatRoom from "./ChatRoom";
import type { Background } from "../../assets/BGECHO_O";

const Personal = () => {
  const { darkMode, selectedBg } = useOutletContext<{
    darkMode: boolean;
    selectedBg: Background;
  }>();
  const [isDockOpen, setIsDockOpen] = useState(false);

  return (
    <div
      // CHANGE 1: Use h-screen instead of h-full to ensure it hits the bottom of the browser
      className={`flex h-[calc(100%+5vh)] p-0 w-full justify-start items-start flex-col transition-colors duration-300 `}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.25), rgba(255,255,255,0.1)), url("${selectedBg.url}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 1. The Dock */}
      <div className="flex-none w-full">
        <TopDock
          darkMode={darkMode}
          openDock={isDockOpen}
          setOpenDock={setIsDockOpen}
        />
      </div>

      {/* 2. The Content */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        // Ensure we are using flex-row and items-stretch to fill vertical height
        className="flex-1 flex flex-row items-stretch min-w-0 min-h-0 mt-4 w-full gap-0"
      >
        {/* SideView: Give it a fixed width so it doesn't get squished or cut off */}
        <div className={`w-100 shrink-0  border-slate-800/50`}>
          <SideView
            darkMode={darkMode}
            isDockOpen={isDockOpen}
            selectedBg={selectedBg}
          />
        </div>

        {/* ChatRoom: This should take up all remaining space */}
        <div
          className={`flex-1 min-w-0 ${isDockOpen ? "h-[87.9vh]" : "h-[92.3vh]"}`}
        >
          <ChatRoom
            darkMode={darkMode}
            isDockOpen={isDockOpen}
            selectedBg={selectedBg}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Personal;
