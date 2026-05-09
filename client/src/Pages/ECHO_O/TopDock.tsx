import { faker } from "@faker-js/faker";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BsDot } from "react-icons/bs";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { v4 as uuid } from "uuid";

interface Props {
  darkMode: boolean;
  openDock?: boolean;
  setOpenDock?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  type: "user";
  id: string;
  name: string;
  dp: string;
}

interface Group {
  type: "group";
  id: string;
  name: string;
  dp: string;
  users: User[];
}

export const TopDock: React.FC<Props> = ({
  darkMode,
  openDock,
  setOpenDock = () => {},
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // 1. Persistent Mock Data Generation
  const data = useMemo(() => {
    faker.seed(123);
    const generateUser = (): User => ({
      type: "user",
      id: uuid(),
      name: faker.person.firstName(),
      dp: faker.image.personPortrait(),
    });

    return Array.from({ length: 65 }, () =>
      faker.number.int({ min: 1, max: 10 }) > 5
        ? generateUser()
        : ({
            type: "group",
            id: uuid(),
            name: faker.color.human(),
            dp: faker.image.avatarGitHub(),
            users: Array.from(
              { length: faker.number.int({ min: 1, max: 5 }) },
              () => generateUser(),
            ),
          } as Group),
    );
  }, []);

  // 2. Centralized Scroll & Select Handler
  const selectItem = (index: number) => {
    if (index >= 0 && index < data.length) {
      setActiveIndex(index);
      itemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  // 3. Multi-digit Keyboard Shortcuts & Event Listeners
  const keyBufferRef = useRef<string>("");
  const bufferTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const listenToWindow = (e: KeyboardEvent) => {
      if (e.code === "KeyH" && e.altKey) {
        e.preventDefault();
        setOpenDock((prev) => !prev);
        return;
      }

      if (!e.altKey || e.key === "Alt") return;

      const currentActiveIndex = activeIndexRef.current;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const nextIdx =
          currentActiveIndex > 0 ? currentActiveIndex - 1 : data.length - 1;
        selectItem(nextIdx);
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIdx =
          currentActiveIndex < data.length - 1 ? currentActiveIndex + 1 : 0;
        selectItem(nextIdx);
        return;
      }

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        if (bufferTimeoutRef.current) clearTimeout(bufferTimeoutRef.current);

        keyBufferRef.current += e.key;
        const targetIndex = parseInt(keyBufferRef.current, 10) - 1;

        if (targetIndex >= 0 && targetIndex < data.length) {
          selectItem(targetIndex);
        } else {
          keyBufferRef.current = "";
          return;
        }

        bufferTimeoutRef.current = setTimeout(() => {
          keyBufferRef.current = "";
          bufferTimeoutRef.current = null;
        }, 400);
      }
    };

    window.addEventListener("keydown", listenToWindow, true);
    return () => {
      window.removeEventListener("keydown", listenToWindow, true);
      if (bufferTimeoutRef.current) clearTimeout(bufferTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, setOpenDock]);

  return (
    <div
      className={`relative flex flex-col z-999 justify-center h-max w-full transition-colors duration-300 ${!openDock ? "bg-transparent" : darkMode ? "bg-[#18181b]/95 border-zinc-800" : "bg-white/90 border-slate-200"} `}
    >
      <AnimatePresence>
        {openDock ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="relative flex items-center justify-center py-2 pb-0 px-15 w-[calc(100%)]">
              {/* Left Scroll Trigger */}
              <button
                className={`p-2 rounded-lg z-10 transition-all ${darkMode ? "hover:bg-zinc-800 text-zinc-400 hover:text-white" : "hover:bg-zinc-100 text-slate-500"}`}
                onClick={() =>
                  selectItem(
                    activeIndex > 0 ? activeIndex - 1 : data.length - 1,
                  )
                }
              >
                <LuChevronLeft size={18} />
              </button>
              {/* Combined Scroll Container Wrapper */}
              <div className="relative w-full">
                {/* Scrollable Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex items-center gap-3 px-4 overflow-x-auto scroll-smooth w-full no-scrollbar select-none"
                  style={{
                    scrollbarWidth: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {data.map((item, idx) => {
                    const isGroup = item.type === "group";
                    const isActive = idx === activeIndex;
                    return (
                      <div
                        key={item.id}
                        className="relative flex flex-col items-center group shrink-0"
                      >
                        <button
                          ref={(el) => {
                            itemRefs.current[idx] = el;
                          }}
                          onClick={() => selectItem(idx)}
                          className="relative flex items-center justify-center rounded-full focus:outline-none"
                        >
                          <span className="text-sm font-bold">
                            <div
                              className={`size-10.5 rounded-full bg-cover bg-center transition-all duration-300 border-2 ${isActive ? "border-blue-500 scale-105 shadow-md" : "border-transparent hover:border-zinc-400"}`}
                              style={{ backgroundImage: `url(${item.dp})` }}
                            />
                          </span>
                          {isGroup && (
                            <motion.div
                              layoutId="activeDot"
                              className={`absolute -bottom-1 size-2 rounded-full ${darkMode ? "bg-white border border-black" : "bg-slate-900 border border-white"}`}
                            />
                          )}
                        </button>

                        {/* Tooltip Display */}
                        <div className="absolute z-50 top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div
                            className={`px-2 py-1 w-max rounded text-[10px] font-black uppercase shadow-xl border flex items-center gap-1.5 ${darkMode ? "bg-zinc-800 border-white/10 text-white" : "bg-white border-zinc-200 text-slate-600"}`}
                          >
                            <span>{item.name}</span>
                            <kbd className="px-1 py-0.5 rounded text-[9px] bg-zinc-700 text-zinc-300 border border-zinc-600 font-mono">
                              {" "}
                              ⌥{idx + 1}{" "}
                            </kbd>
                          </div>
                        </div>

                        <div className="w-full h-4 mt-1.5 relative flex items-center justify-center">
                          {isActive && (
                            <motion.div
                              layoutId="activeTrackbarPill"
                              className={`absolute h-0.5 w-9 rounded-full z-10 ${darkMode ? "bg-white" : "bg-slate-900"}`}
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Scroll Trigger */}
              <button
                className={`p-2 rounded-lg z-10 transition-all ${darkMode ? "hover:bg-zinc-800 text-zinc-400 hover:text-white" : "hover:bg-zinc-100 text-slate-500"}`}
                onClick={() =>
                  selectItem(
                    activeIndex < data.length - 1 ? activeIndex + 1 : 0,
                  )
                }
              >
                <LuChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden w-full flex justify-center items-end"
            onClick={() => setOpenDock(true)}
          >
            <div
              className={`relative flex items-center justify-center px-6 mx-auto max-w-max rounded-b-2xl border-b border-x shadow-2xl backdrop-blur-md transition-colors duration-300 ${
                darkMode
                  ? "bg-[#18181b]/90 border-zinc-200/80 shadow-black/40"
                  : "bg-white/90 border-slate-900/80 shadow-slate-200/50"
              }`}
            >
              {/* Combined Scroll Container Wrapper */}
              <div className="relative w-full">
                {/* Scrollable Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex items-center justify-center overflow-x-auto scroll-smooth w-full no-scrollbar select-none"
                  style={{
                    scrollbarWidth: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {/* Your item map content loop container goes directly here */}
                  <div className="relative flex items-center gap-3 shrink-0">
                    {[1, 2, 3].map((i) => (
                      <BsDot
                        size={22}
                        key={i}
                        className={
                          darkMode ? "text-zinc-400" : "text-slate-500"
                        }
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
  );
};

export default TopDock;
