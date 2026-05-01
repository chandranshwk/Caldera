import { useOutletContext } from "react-router-dom";
import SideView from "./SideView";
import TopDock from "./TopDock";
import { useState } from "react";
import { motion } from "framer-motion"; // Import motion

const Personal = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const [isDockOpen, setIsDockOpen] = useState(false);

  return (
    <div
      // CHANGE 1: Use h-screen instead of h-full to ensure it hits the bottom of the browser
      className={`flex h-[calc(100%+5vh)] p-0 w-full justify-start items-start flex-col ${
        darkMode ? "bg-[#18181b]" : "bg-zinc-100"
      } transition-colors duration-300 overflow-hidden`}
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
        // CHANGE 2: Ensure flex-1 is paired with min-h-0 and remove any h-full here
        className="flex-1 flex justify-start min-w-0 min-h-0 mt-4 w-full"
      >
        <SideView darkMode={darkMode} isDockOpen={isDockOpen} />
      </motion.div>
    </div>
  );
};

export default Personal;
