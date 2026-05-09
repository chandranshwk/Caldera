import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { PiCommandLight } from "react-icons/pi";
import type { Group, UserP } from "./ECHO_O";

interface Props {
  darkMode: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contacts: (Group | UserP)[];
}

interface CommandItemProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
  module?: string;
  category?: string;
  style?: React.CSSProperties;
  darkMode?: boolean;
  isSelected?: boolean;
}

const Search: React.FC<Props> = ({ darkMode, setSearchOpen, contacts }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Maps target plain native sub-elements instead of motion wrappers
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const [search, setSearch] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [prevSearch, setPrevSearch] = useState<string>("");

  const theme = {
    overlay:
      "fixed inset-0 z-[997] flex items-start justify-center pt-[12vh] px-4",
    backdrop: "fixed inset-0 bg-black/40",
    panel: `relative w-full border max-w-xl overflow-hidden rounded-xl shadow-2xl transition-all duration-300 ${
      darkMode
        ? "bg-zinc-900/90 border-white/10 text-white shadow-black/50"
        : "bg-white/90 border-black text-zinc-900 shadow-black/10"
    } backdrop-blur-2xl`,
    input:
      "w-full p-4 bg-transparent outline-none text-sm placeholder:text-zinc-500",
  };

  const filteredActions: CommandItemProps[] = useMemo(() => {
    return contacts
      .map((item) => {
        const isGroup = item.type === "group";
        return {
          id: item.id,
          title: item.name,
          category: isGroup ? "Groups" : "Direct Contacts",
          module: isGroup
            ? `${(item as Group).users.length} members`
            : "Available Contact",
          icon: (
            <img
              src={item.dp}
              alt=""
              className="w-full h-full rounded-md object-cover"
            />
          ),
          shortcut: isGroup ? "Enter" : undefined,
          action: () => console.log(`Selected item ID: ${item.id}`),
        };
      })
      .filter((action) =>
        action.title.toLowerCase().includes(search.toLowerCase()),
      );
  }, [contacts, search]);

  // Synchronous State Resetting during render phase
  if (search !== prevSearch) {
    setPrevSearch(search);
    setSelectedIndex(0);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    itemRefs.current.clear();
  }, [search]);

  // SCROLL ALIGNMENT EFFECT: Ref targeting standard un-transformed nodes
  useEffect(() => {
    const activeRawElement = itemRefs.current.get(selectedIndex);
    if (activeRawElement) {
      activeRawElement.scrollIntoView({
        behavior: "auto",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    const listenToWindow = (e: KeyboardEvent) => {
      if (e.code === "KeyM" && e.ctrlKey) {
        e.preventDefault();
        setSearchOpen(false);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setSearchOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredActions.length === 0
            ? 0
            : (prev + 1) % filteredActions.length,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredActions.length === 0
            ? 0
            : (prev - 1 + filteredActions.length) % filteredActions.length,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action();
          setSearchOpen(false);
        }
      }
    };

    window.addEventListener("keydown", listenToWindow, true);
    return () => window.removeEventListener("keydown", listenToWindow, true);
  }, [setSearchOpen, filteredActions, selectedIndex]);

  return (
    <AnimatePresence mode="popLayout">
      <div className={theme.overlay}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={theme.backdrop}
          onClick={() => setSearchOpen(false)}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={theme.panel}
        >
          <div
            className={`flex items-center px-5 border-b ${darkMode ? "border-white/10" : "border-black/5"}`}
          >
            <div
              className={`flex items-center justify-center mr-2 px-1.5 py-0.5 rounded text-[10px] border font-bold ${darkMode ? "bg-zinc-800 border-white/10 text-zinc-500" : "bg-zinc-100 border-black/10 text-zinc-400"}`}
            >
              <PiCommandLight size={15} />M
            </div>
            <BiSearch
              className={darkMode ? "text-zinc-400" : "text-zinc-500"}
              size={18}
            />
            <div className="flex items-center flex-1">
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type name to search contacts..."
                className={theme.input}
              />
              <AnimatePresence>
                {search.toLowerCase().startsWith("/n") && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-[10px] font-medium text-blue-500 animate-pulse pr-4 whitespace-nowrap"
                  >
                    Try -docs, -sheets, or -AXIS_O
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* layoutScroll prop tells Framer Motion to respect the container scroll bounding boxes */}
          <div
            ref={scrollContainerRef}
            className="max-h-[50vh] overflow-y-auto py-3 relative layoutScroll"
          >
            <AnimatePresence mode="popLayout">
              {filteredActions.length > 0 ? (
                filteredActions.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Plain native wrapper node handles structural positioning variables directly */}
                    <div
                      ref={(el) => {
                        if (el) itemRefs.current.set(index, el);
                        else itemRefs.current.delete(index);
                      }}
                    >
                      {(index === 0 ||
                        item.category !==
                          filteredActions[index - 1].category) && (
                        <p className="px-4 py-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest pointer-events-none select-none">
                          {item.category}
                        </p>
                      )}
                      <CommandItem
                        {...item}
                        darkMode={darkMode}
                        isSelected={index === selectedIndex}
                        action={() => {
                          item.action();
                          setSearchOpen(false);
                        }}
                      />
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center text-zinc-500 text-xs font-medium italic"
                >
                  No contacts available with "{search}"
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className={`p-3 flex justify-between text-[10px] font-medium border-t opacity-60 ${darkMode ? "border-white/5" : "border-black/5"}`}
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="font-bold border border-current px-1 rounded">
                  Enter
                </kbd>{" "}
                to execute
              </span>
              <span className="flex items-center gap-1">
                <kbd className="font-bold border border-current px-1 rounded">
                  ESC
                </kbd>{" "}
                or{" "}
                <kbd className="font-bold border border-current px-1 rounded">
                  Ctrl+M
                </kbd>{" "}
                to close
              </span>
            </div>
            <span>OXU_O OS V 1.0.4</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const CommandItem: React.FC<CommandItemProps> = ({
  icon,
  title,
  shortcut,
  module,
  darkMode,
  action,
  isSelected,
  style,
}) => (
  <div
    className={`mx-2 flex items-center ${style ? "my-2" : ""} ${
      darkMode ? "" : style ? "border border-black" : ""
    } justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
      isSelected
        ? darkMode
          ? "bg-white/10 text-white"
          : "bg-black/5 text-zinc-900"
        : "text-zinc-400"
    }`}
    onClick={action}
    style={style || {}}
  >
    <div className="flex items-center gap-4">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-md overflow-hidden text-lg ${
          isSelected
            ? "bg-blue-600 text-white"
            : darkMode
              ? "bg-zinc-800 text-zinc-400"
              : style
                ? "bg-zinc-800"
                : "bg-zinc-100 text-zinc-600"
        }`}
      >
        {icon}
      </div>
      <div>
        <div
          className={`text-[13px] font-medium ${style ? "text-slate-950" : isSelected ? (darkMode ? "text-white" : "text-zinc-900") : darkMode ? "text-zinc-200" : "text-zinc-800"}`}
        >
          {title}
        </div>
        <div
          className={`text-[11px] font-medium ${style ? "text-black opacity-10" : "opacity-40"}`}
        >
          {module}
        </div>
      </div>
    </div>
    {shortcut && (
      <span
        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
          style
            ? "text-zinc-900 bg-zinc-100"
            : darkMode
              ? "border-white/10 text-zinc-500"
              : "border-black/10 text-zinc-400"
        }`}
      >
        {shortcut}
      </span>
    )}
  </div>
);

export default Search;
