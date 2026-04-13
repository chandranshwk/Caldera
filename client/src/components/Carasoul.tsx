import React, { useEffect, useRef, useState } from "react";

export interface ViewOption {
  name: string;
  icon?: React.ReactNode;
  exec: () => void;
}

interface CarasoulProps {
  darkMode: boolean;
  options: ViewOption[];
  view: number;
}

const Carasoul: React.FC<CarasoulProps> = ({ darkMode, options, view }) => {
  const [style, setStyle] = useState({ width: 0, left: 0 });
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeButton = buttonRefs.current[view];
    if (activeButton)
      setStyle({
        width: activeButton.offsetWidth,
        left: activeButton.offsetLeft,
      });
  }, [view, options]);
  return (
    <div
      className={`relative left-2 flex items-center p-1.5 py-2 rounded-lg my-0 w-fit  transition-colors duration-300 `}
    >
      {/* Sliding Background Indicator */}
      <div
        className={`absolute h-0.5 bottom-1.5  rounded-xl shadow-sm transition-all duration-300 ease-in-out z-0  bg-indigo-700/40`}
        style={{
          width: `${style.width - 15}px`,
          transform: `translateX(${style.left}px)`,
        }}
      />
      {options.map((option, idx) => (
        <button
          key={idx}
          ref={(el) => {
            buttonRefs.current[idx] = el;
          }}
          className={`relative  z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 ${
            view === idx
              ? darkMode
                ? "text-white"
                : "text-zinc-900"
              : darkMode
                ? "text-zinc-400 hover:text-zinc-100"
                : "text-zinc-700 hover:text-zinc-900"
          }`}
          onClick={() => option.exec()}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default Carasoul;
