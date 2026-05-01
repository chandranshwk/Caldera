import { faker } from "@faker-js/faker/locale/zu_ZA";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BiBadgeCheck, BiPhotoAlbum } from "react-icons/bi";
import { FiZap } from "react-icons/fi";
import { HiShieldCheck } from "react-icons/hi";
import { LuFileText, LuShieldAlert } from "react-icons/lu";
import { SlArrowDown } from "react-icons/sl";
import Carasoul, { type ViewOption } from "../../components/Carasoul";
import { CiLock } from "react-icons/ci";

interface SideViewProps {
  darkMode: boolean;
  isDockOpen: boolean;
}

type StatusType = "encrypted" | "warning" | "premium" | "verified";
const SideView: React.FC<SideViewProps> = ({ darkMode, isDockOpen }) => {
  const [online] = useState(true);

  console.log(isDockOpen);

  const tempDP =
    "data:image/jpeg;base64,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";

  const statusMap: Record<
    StatusType,
    { text: string; styles: string; icon: React.ReactNode }
  > = {
    encrypted: {
      text: "This chat is end-to-end encrypted.",
      icon: (
        <HiShieldCheck
          size={14}
          className={`${!darkMode ? "text-emerald-900" : "text-white"}`}
        />
      ),
      styles: `${!darkMode ? "bg-emerald-100/50 text-emerald-800" : "bg-emerald-800/70 text-white"} border-emerald-100`,
    },
    warning: {
      text: "You have no mutual contacts. Proceed with caution.",
      icon: (
        <LuShieldAlert
          size={14}
          className={`${!darkMode ? "text-amber-900" : "text-amber-200"}`}
        />
      ),
      styles: `${!darkMode ? "bg-amber-50/50 text-amber-800" : "bg-amber-800/70 text-amber-100"}  border-amber-200`,
    },
    premium: {
      text: "Premium member since Jan.",
      icon: (
        <FiZap
          size={14}
          className={`${!darkMode ? "text-purple-900 fill-purple-900" : "text-white"}`}
        />
      ),
      styles: `${!darkMode ? "bg-purple-100/50 text-purple-900" : "bg-purple-800/70 text-whtie"} border-purple-100`,
    },
    verified: {
      text: "Identity verified via Phone/Social.",
      icon: (
        <BiBadgeCheck
          size={14}
          className={`${!darkMode ? "text-blue-900" : "text-white"}`}
        />
      ),
      styles: `${!darkMode ? "bg-blue-100/50 text-blue-900" : "bg-blue-800/70 text-blue-100"} border-blue-100`,
    },
  };

  const current = statusMap["encrypted"];
  const languages = ["English", "German", "Hindi", "Spanish", "French"];

  faker.seed(123); // For consistent fake data across renders
  const fakeGroups = Array.from({ length: 8 }, () =>
    faker.image.avatarGitHub(),
  );

  const [showDetail, setShowDetail] = useState(false);

  const [showMedia, setShowMedia] = useState(0);
  const options: ViewOption[] = [
    {
      name: "Activity",
      icon: <CiLock size={14} />,
      exec: () => setShowMedia(0),
    },
    {
      name: "Media",
      icon: <BiPhotoAlbum size={14} />,
      exec: () => setShowMedia(1),
    },
    {
      name: "Links & Docs",
      icon: <LuFileText size={14} />,
      exec: () => setShowMedia(2),
    },
  ];

  return (
    <div
      className={`relative -left-2 -top-5 bottom-0 ${isDockOpen ? "min-h-[93.6vh]" : "min-h-[97.6vh]"}  min-w-sm flex flex-col gap-1.5 p-4 overflow-y-auto scrollbar-hide origin-top `}
    >
      {/* Info */}
      <div
        className={`w-95 m-0 min-h-max pb-0 mb-2 overflow-hidden rounded-lg border ${darkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-slate-200"} shadow-xl font-sans`}
      >
        {/* 1. Status Banner (Full width, top) */}
        <div
          className={`flex items-center gap-2 px-4 py-2 text-[11px] font-bold ${current.styles}`}
        >
          <div className="flex items-center gap-2">
            <span className="shrink-0">{current.icon}</span>
            <span className="truncate">{current.text}</span>
          </div>
          <button
            onClick={() => setShowDetail((prev: boolean) => !prev)}
            className={`ml-auto text-[9px] shadow-sm p-2 rounded-lg bg-zinc-100/10 font-black uppercase tracking-wider ${darkMode ? "text-slate-300" : "text-slate-600"}`}
          >
            <SlArrowDown
              size={14}
              className={`${showDetail ? "rotate-180" : ""} transition-all duration-300`}
            />
          </button>
        </div>
        <AnimatePresence>
          {showDetail && (
            <motion.div
              // 1. Animation Props
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden" // Prevents content pop-in during slide
            >
              <div className="p-4">
                {/* 2. Header Row */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col min-w-0">
                    <h2
                      className={`text-2xl font-black tracking-tight truncate ${darkMode ? "text-white" : "text-slate-800"}`}
                    >
                      John Doe
                    </h2>
                    <span className="text-[12px] font-bold tracking-widest text-slate-400 uppercase truncate">
                      @John123
                    </span>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <p className="text-[9px] font-black uppercase tracking-tighter text-slate-400">
                        Media Shared
                      </p>
                      <p
                        className={`text-lg font-bold ${darkMode ? "text-slate-200" : "text-slate-700"}`}
                      >
                        1.5k
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Middle Context Bar (Grey Box) */}
                <div
                  className={`mt-5 flex items-center justify-between rounded-xl p-2.5 py-2 mb-0 gap-2 ${darkMode ? "bg-zinc-800/30" : "bg-slate-50"}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-black/5">
                      <img
                        src={tempDP}
                        alt="profile"
                        className="h-full w-full object-cover"
                      />
                      <div
                        className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 ${darkMode ? "border-zinc-800" : "border-white"} ${online ? "bg-green-500" : "bg-red-400"}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">
                        {" "}
                        Status{" "}
                      </p>
                      <p
                        className={`text-[11px] font-bold italic leading-none truncate ${darkMode ? "text-slate-300" : "text-slate-600"}`}
                      >
                        "Living life..."
                      </p>
                    </div>
                  </div>
                  <div className="bg-emerald-100/80 px-2 py-1 rounded-md shrink-0">
                    <p className="text-[9px] font-black text-emerald-700 uppercase">
                      Local:{" "}
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* 4. Bottom Grid (Three Columns) */}
                <div className="mt-2 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                  <div className="min-w-0">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                      {" "}
                      Username{" "}
                    </p>
                    <p
                      className={`text-[11px] font-bold truncate ${darkMode ? "text-slate-200" : "text-slate-700"}`}
                    >
                      @John123
                    </p>
                  </div>
                  <div className="px-2 border-x border-slate-100 min-w-0">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                      {" "}
                      Languages{" "}
                    </p>
                    <p
                      className={`text-[11px] font-bold truncate ${darkMode ? "text-slate-200" : "text-slate-700"}`}
                    >
                      {languages.slice(0, 2).join(", ")}
                    </p>
                  </div>
                  <div className="pl-1 min-w-0">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-1 truncate">
                      {" "}
                      Common Groups{" "}
                    </p>
                    <div className="flex -space-x-2 overflow-hidden">
                      {fakeGroups.slice(0, 3).map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          className="size-6 rounded-full border-2 border-white shadow-sm object-cover shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Details */}
      <div
        className={`w-95 min-h-[calc(100%-28vh)] flex-1 m-0 overflow-hidden rounded-lg flex-col border ${darkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-slate-200"} shadow-xl font-sans`}
      >
        <div className="overflow-y-auto h-full p-4 ">
          <div className="w-full flex justify-center">
            <Carasoul darkMode={darkMode} view={showMedia} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideView;
