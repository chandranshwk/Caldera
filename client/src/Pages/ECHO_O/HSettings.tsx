import type { User } from "@supabase/supabase-js";
import { useOutletContext } from "react-router-dom";
import { ALL_BACKGROUNDS, type Background } from "../../assets/BGEcho_O.tsx";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { Illustrations } from "../../assets/CIllustrations.ts";
import { faker } from "@faker-js/faker";
import { FiBell } from "react-icons/fi";

const HSettings = () => {
  const { user, darkMode, selectedBg, setSelectedBg } = useOutletContext<{
    user: User;
    darkMode: boolean;
    selectedBg: Background;
    setSelectedBg: (data: Background) => void;
  }>();
  const [showAll, setShowAll] = useState<boolean>(false);

  const displayedBgs = showAll ? ALL_BACKGROUNDS : ALL_BACKGROUNDS.slice(0, 4);

  const generateMockCommunities = (i: number) => {
    // Use a fallback to avoid undefined if the array is loading
    const randomIll =
      Illustrations[i % Illustrations.length] || Illustrations[0];

    return {
      idx: i + 1,
      name: faker.company.name(),
      description:
        "Turn your imagination on to create something incredible with our tools.",
      image: randomIll,
      tag: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
        faker.company.buzzAdjective(),
      ),
    };
  };

  const MOCKCOMMUNITIES = Array.from({ length: 12 }, (_, i) =>
    generateMockCommunities(i),
  );

  return (
    <div className="overflow-y-auto">
      {/* Background & Container */}
      <div
        className={`flex flex-col mb-5 h-max border rounded-lg border-zinc-900 p-6 overflow-y-auto custom-scrollbar `}
        style={{
          background:
            selectedBg?.idx === 2 ||
            selectedBg?.idx === 3 ||
            selectedBg?.idx === 10 ||
            selectedBg?.idx === 12
              ? `#E07D52`
              : `${selectedBg?.ui.bgUser}1A`, //1,2,9,11
        }}
      >
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between flex-wrap gap-4"
        >
          <div>
            <h2
              className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Appearance
            </h2>
            <p
              className={`text-sm ${darkMode ? "text-slate-100" : "text-slate-700"}`}
            >
              Logged in as: <span className="font-medium">{user.email}</span>
            </p>
          </div>
          {/* Action Button */}
          <motion.button
            layout
            onClick={() => setShowAll((prev) => !prev)}
            className={`group relative  self-center flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-200 active:scale-95 hover:shadow-xl ${
              darkMode
                ? "bg-slate-800 text-white border border-slate-700 hover:border-blue-500"
                : "bg-white text-slate-900 border border-slate-200 shadow-sm hover:border-blue-400"
            }`}
          >
            <span className="relative z-10">
              {showAll ? "Show Less" : "Explore All Themes"}
            </span>
            <motion.div animate={{ rotate: showAll ? 180 : 0 }}>
              <LuChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Grid Container */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
        >
          <AnimatePresence mode="popLayout">
            {displayedBgs.map((bg: Background, index) => (
              <motion.div
                layout
                key={bg.idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                transition={{
                  duration: 0.3,
                  delay: showAll ? 0 : index * 0.05,
                }}
                onClick={() => setSelectedBg(bg)}
                className="group cursor-pointer flex flex-col gap-3 w-full max-w-72"
              >
                {/* Preview Image */}
                <div
                  className={`relative aspect-video rounded-xl transition-all duration-300 border-2 overflow-hidden ${
                    selectedBg === bg
                      ? "border-blue-500 ring-4 ring-blue-500/20 scale-[1.02]"
                      : "border-transparent hover:border-slate-400"
                  } shadow-lg`}
                  style={{
                    backgroundImage: `url("${bg.url}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                      Select Theme
                    </span>
                  </div>
                </div>

                {/* Info & Color Swatches */}
                <div className="flex justify-between items-start px-1">
                  <div className="flex flex-col gap-2">
                    <span
                      className={`text-sm font-bold capitalize ${darkMode ? "text-slate-200" : "text-slate-700"}`}
                      style={{ letterSpacing: "1.5px", wordSpacing: "3.5px" }}
                    >
                      {bg.name
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </span>

                    {/* Color Palette Preview */}
                    <div className="flex gap-1.5">
                      {[
                        bg.ui.bgUser,
                        bg.ui.bgMessenger,
                        bg.ui.text,
                        bg.ui.secondaryText,
                        bg.ui.border,
                        bg.ui.accent,
                      ].map((color, i) => (
                        <div
                          key={i}
                          className={`size-5 rounded-full border ${darkMode ? "border-white/20" : "border-black/20"} shadow-sm`}
                          style={{ backgroundColor: color }}
                          title={`Color ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter opacity-40 bg-slate-500/10 px-2 py-0.5 rounded">
                    {bg.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Recent Communities Accessed */}
      <div
        className={`flex flex-col h-full p-6 overflow-y-auto custom-scrollbar ${darkMode ? "bg-zinc-800/10" : "bg-zinc-300/10"}`}
      >
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between flex-wrap gap-4"
        >
          <div>
            <h2
              className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Communities
            </h2>
          </div>
          {/* Action Button */}
          <motion.button
            layout
            className={`group relative  self-center flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-200 active:scale-95 hover:shadow-xl ${
              darkMode
                ? "bg-slate-800 text-white border border-slate-700 hover:border-blue-500"
                : "bg-white text-slate-900 border border-slate-200 shadow-sm hover:border-blue-400"
            }`}
          >
            <span className="relative z-10">
              {!showAll ? "See All" : "See Recent"}
            </span>
            <motion.div animate={{ rotate: showAll ? 180 : 0 }}>
              <LuChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>

        <div className="grid columns-1 grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {MOCKCOMMUNITIES.slice(0, 3).map((com, idx) => {
              const accentColor = darkMode
                ? com.image.ui.dark
                : com.image.ui.light;

              return (
                <motion.div
                  layout
                  key={com.idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: showAll ? 0 : idx * 0.05,
                  }}
                  className={`group cursor-pointer flex flex-col w-full  p-8 rounded-lg transition-all duration-500
            ${darkMode ? "bg-zinc-800 shadow-none" : "bg-white shadow-sm hover:shadow-md"}`}
                >
                  {/* 1. Toggle Style Indicator (Top Right) */}
                  <div className="flex justify-end mb-4 gap-4">
                    <FiBell size={16} />
                    <div
                      className={`w-8 h-4 rounded-full p-0.5 flex items-center ${darkMode ? "bg-zinc-900" : "bg-gray-200"}`}
                    >
                      <div
                        className="w-3 h-3 rounded-full ml-auto"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>
                  </div>

                  {/* 2. Illustration Area (Fixed height keeps text aligned) */}
                  <div className="flex items-center justify-center h-64 w-full mb-8 overflow-hidden ">
                    <img
                      src={com.image.file}
                      alt={com.name}
                      className="h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* 3. Text Content */}
                  <div className="flex flex-col gap-2">
                    <h3
                      className={`text-[22px] font-bold tracking-tight leading-tight ${darkMode ? "text-white" : "text-gray-800"}`}
                    >
                      {com.name}
                    </h3>

                    <p
                      className={`text-[14px] leading-relaxed line-clamp-2 mb-4 ${darkMode ? "text-zinc-500" : "text-gray-400"}`}
                    >
                      {com.description}
                    </p>

                    {/* 4. Tags (Pill style from the image) */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {com.tag.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider"
                          style={{
                            backgroundColor: `${accentColor}15`, // 8% transparency
                            color: accentColor,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      {/* All personal contacts */}
      <div
        className={`flex flex-col h-full p-6 overflow-y-auto custom-scrollbar ${darkMode ? "bg-zinc-800/10" : "bg-zinc-300/10"}`}
      >
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between flex-wrap gap-4"
        >
          <div>
            <h2
              className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Personal Contacts
            </h2>
          </div>
        </motion.div>

        <div className="grid columns-1 grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {MOCKCOMMUNITIES.slice(0, 3).map((com, idx) => {
              const accentColor = darkMode
                ? com.image.ui.dark
                : com.image.ui.light;

              return (
                <motion.div
                  layout
                  key={com.idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: showAll ? 0 : idx * 0.05,
                  }}
                  className={`group cursor-pointer flex flex-col w-full  p-8 rounded-lg transition-all duration-500
            ${darkMode ? "bg-zinc-800 shadow-none" : "bg-white shadow-sm hover:shadow-md"}`}
                >
                  {/* 1. Toggle Style Indicator (Top Right) */}
                  <div className="flex justify-end mb-4 gap-4">
                    <FiBell size={16} />
                    <div
                      className={`w-8 h-4 rounded-full p-0.5 flex items-center ${darkMode ? "bg-zinc-900" : "bg-gray-200"}`}
                    >
                      <div
                        className="w-3 h-3 rounded-full ml-auto"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>
                  </div>

                  {/* 2. Illustration Area (Fixed height keeps text aligned) */}
                  <div className="flex items-center justify-center h-64 w-full mb-8 overflow-hidden ">
                    <img
                      src={com.image.file}
                      alt={com.name}
                      className="h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* 3. Text Content */}
                  <div className="flex flex-col gap-2">
                    <h3
                      className={`text-[22px] font-bold tracking-tight leading-tight ${darkMode ? "text-white" : "text-gray-800"}`}
                    >
                      {com.name}
                    </h3>

                    <p
                      className={`text-[14px] leading-relaxed line-clamp-2 mb-4 ${darkMode ? "text-zinc-500" : "text-gray-400"}`}
                    >
                      {com.description}
                    </p>

                    {/* 4. Tags (Pill style from the image) */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {com.tag.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider"
                          style={{
                            backgroundColor: `${accentColor}15`, // 8% transparency
                            color: accentColor,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HSettings;
