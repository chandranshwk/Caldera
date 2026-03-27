import React, {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive" | "primary";
  separator?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: MenuItem[];
  darkMode: boolean;
  width?: string;
}

// 1. Wrap the component in forwardRef
const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ trigger, items, darkMode, width = "w-48" }, ref) => {
    // 2. Add 'ref' as the second argument
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("keydown", handleEsc);
      };
    }, []);

    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div
          ref={ref}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="cursor-pointer bg-transparent relative z-0"
        >
          {trigger}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className={`
    absolute -left-42 mt-2 ${width} z-999 origin-top-left
    rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden
    ${
      darkMode
        ? "bg-[#1c1c1e]/90 border-white/10 shadow-black/40"
        : "bg-white/90 border-black/5 shadow-xl shadow-black/10"
    }
  `}
            >
              <div className="p-1.5">
                {items.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {item.separator && (
                      <div
                        className={`my-1 h-px w-full ${darkMode ? "bg-white/5" : "bg-black/5"}`}
                      />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        item.onClick();
                        setIsOpen(false);
                      }}
                      className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[13px] font-medium
                    ${
                      darkMode
                        ? item.variant === "destructive"
                          ? "hover:bg-rose-500/20 text-rose-400"
                          : "hover:bg-white/10 text-neutral-300 hover:text-white"
                        : item.variant === "destructive"
                          ? "hover:bg-rose-50 text-rose-600"
                          : "hover:bg-black/5 text-neutral-600 hover:text-black"
                    }`}
                    >
                      {item.icon && (
                        <span className="text-lg opacity-80 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                      )}
                      {item.label}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

// 4. Set DisplayName for debugging (optional but recommended)
Dropdown.displayName = "Dropdown";

export default Dropdown;
