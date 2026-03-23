import React from "react";
import { clsx } from "clsx";

interface InputProps {
  darkMode?: boolean;
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  input: string;
  setInput: (value: string) => void;
  type: string;
  size?: "sm" | "md" | "lg";
  autocomplete?: boolean;
  extra?: string;
}

const Input: React.FC<InputProps> = ({
  darkMode,
  label,
  placeholder,
  icon,
  input,
  setInput,
  type,
  size = "md",
  autocomplete,
  extra,
}) => {
  const isFilled = input.length > 0;

  const sizes = {
    sm: {
      container: "h-10 rounded-lg",
      input: "pb-1.5 pt-4 text-xs",
      labelBase:
        "peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-xs",
      labelActive: "-top-1 text-[9px]",
      icon: "left-3 text-sm",
      iconPadding: "pl-9",
    },
    md: {
      container: "h-12 rounded-xl",
      input: "pb-2 pt-5.5 text-sm",
      labelBase:
        "peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm",
      labelActive: "-top-1 text-[10px]",
      icon: "left-4 text-base",
      iconPadding: "pl-11",
    },
    lg: {
      container: "h-16 rounded-2xl",
      input: "pb-3 pt-7.5 text-base",
      labelBase:
        "peer-placeholder-shown:top-5 peer-placeholder-shown:text-base",
      labelActive: "top-0.5 text-[11px]",
      icon: "left-5 text-xl",
      iconPadding: "pl-14",
    },
  };

  const s = sizes[size];
  const autoCompleteValue = autocomplete ? "on" : "new-password";

  return (
    <div className="group relative w-full">
      {/* Background Glow */}

      <div
        className={clsx(
          "relative flex items-center border transition-all duration-300",
          s.container,
          darkMode
            ? "bg-black/95 backdrop-blur-xl border-white/10 group-focus-within:border-white/50"
            : "bg-white border-slate-200 group-focus-within:border-yellow-500 shadow-sm",
          extra ?? "",
        )}
      >
        {/* Adaptive Icon */}
        {icon && (
          <div
            className={clsx(
              "absolute z-10 transition-all duration-300 pointer-events-none",
              s.icon,
              darkMode
                ? "text-slate-500 group-focus-within:text-white"
                : "text-slate-400 group-focus-within:text-yellow-600",
              isFilled && (darkMode ? "text-white" : "text-orange"),
            )}
          >
            {icon}
          </div>
        )}

        <div className="relative flex-1 h-full">
          <input
            type={type}
            id={label + Math.random}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete={autoCompleteValue}
            placeholder={placeholder}
            className={clsx(
              "peer w-full h-full bg-transparent px-4 outline-none transition-all relative -top-2",
              "placeholder:transition-opacity placeholder:duration-300 placeholder:opacity-0 focus:placeholder:opacity-100",
              s.input,
              darkMode
                ? "text-slate-100 placeholder:text-slate-600 bg-black"
                : "text-slate-900 placeholder:text-slate-400 ",
              icon ? s.iconPadding : "pl-4",
              darkMode
                ? "autofill:shadow-[0_0_0_1000px_#000000_inset] autofill:h-max autofill:w-max"
                : "autofill:shadow-[0_0_0_1000px_#ffffff_inset] autofill:h-max autofill:w-max",
            )}
          />

          {/* Floating Label */}
          <label
            htmlFor={label}
            className={clsx(
              "absolute left-0 transition-all duration-300 pointer-events-none tracking-wide px-1",
              s.labelBase,
              // If input is NOT empty OR focused, apply active styles
              isFilled
                ? clsx(s.labelActive, "uppercase font-bold")
                : "peer-focus:-top-2 peer-focus:text-[12px] ",
              icon
                ? isFilled
                  ? "left-4"
                  : clsx("peer-focus:left-4", s.iconPadding)
                : "left-4",
              darkMode
                ? "text-white/50 peer-focus:text-white bg-black"
                : "text-slate-400 peer-focus:text-orange bg-white",
              isFilled &&
                (darkMode ? "text-white bg-black" : "text-yellow bg-white"),
            )}
          >
            {label}
          </label>
        </div>
      </div>

      {/* Modern Bottom Scanline */}
      <div
        className={clsx(
          "absolute bottom-0 left-1/2 h-[1.3px] w-0 -translate-x-1/2 transition-all duration-700 group-focus-within:w-1/2",
          darkMode ? "bg-white/50" : "bg-orange-600",
        )}
      />
    </div>
  );
};

export default Input;
