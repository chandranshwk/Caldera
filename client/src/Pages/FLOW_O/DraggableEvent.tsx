import { useDraggable, useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { ScheduledEvent } from "./Calendar";

interface CalendarEventProps {
  event: ScheduledEvent;
  idx: number;
  darkMode: boolean;
  calculateTime: (pixels: number) => string;
  isResizing: number | null;
  setIsResizing: React.Dispatch<React.SetStateAction<number | null>>;
  isDraggingGlobal: boolean;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({
  event,
  idx,
  darkMode,
  calculateTime,
  isResizing,
  setIsResizing,
  isDraggingGlobal,
}) => {
  const [canDrag, setCanDrag] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `event-${idx}`,
      data: { idx, type: "move" },
      disabled: !canDrag || isResizing !== null,
    });

  // Reset drag lock when dropping
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isDraggingGlobal) setCanDrag(false);
  }, [isDraggingGlobal]);
  const RANDOMCOLOR = useMemo(() => {
    return [
      {
        bg: darkMode ? "bg-rose-500" : "bg-rose-50",
        bar: "bg-rose-500",
        text: !darkMode ? "text-black" : "text-white",
        border: darkMode ? "border-rose-500/20" : "border-rose-100",
      },
      {
        bg: darkMode ? "bg-sky-500" : "bg-sky-50",
        bar: "bg-sky-500",
        text: !darkMode ? "text-black" : "text-white",
        border: darkMode ? "border-sky-500/20" : "border-sky-100",
      },
      {
        bg: darkMode ? "bg-emerald-500" : "bg-emerald-50",
        bar: "bg-emerald-500",
        text: !darkMode ? "text-black" : "text-white",
        border: darkMode ? "border-emerald-500/20" : "border-emerald-100",
      },
      {
        bg: darkMode ? "bg-amber-500" : "bg-amber-50",
        bar: "bg-amber-500",
        text: !darkMode ? "text-black" : "text-white",
        border: darkMode ? "border-amber-500/20" : "border-amber-100",
      },
      {
        bg: darkMode ? "bg-purple-500" : "bg-purple-50",
        bar: "bg-purple-500",
        text: !darkMode ? "text-black" : "text-white",
        border: darkMode ? "border-purple-500/20" : "border-purple-100",
      },
      {
        bg: darkMode ? "bg-indigo-500" : "bg-indigo-50",
        bar: "bg-indigo-500",
        text: !darkMode ? "text-black" : "text-white",
        border: darkMode ? "border-indigo-500/20" : "border-indigo-100",
      },
      {
        bg: darkMode ? "bg-cyan-500" : "bg-cyan-50",
        bar: "bg-cyan-500",
        text: !darkMode ? "text-black" : "text-white",
        border: darkMode ? "border-cyan-500/20" : "border-cyan-100",
      },
    ];
  }, [darkMode]);

  // Заключваме цвета за конкретната карта
  const colors = useMemo(
    () => RANDOMCOLOR[Math.floor(Math.random() * RANDOMCOLOR.length)],
    [RANDOMCOLOR],
  );

  const active = isDragging || isDraggingGlobal || isResizing === idx;

  return (
    <motion.div
      ref={setNodeRef}
      onDoubleClick={() => setCanDrag(true)}
      layout
      animate={{
        top: event.top + (transform?.y || 0),
        height: event.height,
        zIndex: active ? 50 : 20,
        scale: active ? 1.02 : 1,
        // Visual indicator that drag is unlocked
        boxShadow: canDrag ? "0 0 0 2px #3b82f6" : "0 1px 2px rgba(0,0,0,0.05)",
      }}
      {...listeners}
      {...attributes}
      className={`absolute left-1 right-1 rounded-md shadow-sm overflow-hidden border border-black/5 ${colors.bg} select-none`}
    >
      {/* The Solid Left Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colors.bar}`} />

      <div className="flex flex-col h-full pl-3 pr-2 py-1.5 pointer-events-none">
        {/* Event Title */}
        <span className={`text-[11px] font-bold leading-tight ${colors.text}`}>
          {event.name}
        </span>

        {/* Time Range */}
        <span
          className={`text-[10px] font-medium opacity-70 mt-0.5 ${colors.text}`}
        >
          {calculateTime(event.top)} - {calculateTime(event.top + event.height)}
        </span>
      </div>

      {/* Resize Handle (matching the image's clean look) */}
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsResizing(idx);
        }}
        className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-black/5 transition-colors"
      />
    </motion.div>
  );
};

interface DayColumnProps {
  day: {
    id: string;
    dayName: string;
    dayNumber: number;
    isToday: boolean;
  };
  scheduledEvents: ScheduledEvent[];
  darkMode: boolean;
  styles: {
    border: string;
    bg: string;
    text: string;
    hover: string;
    subBorder: string;
    stickyHeader: string;
  };
  calculateTime: (pixels: number) => string;
  isResizing: number | null;
  setIsResizing: React.Dispatch<React.SetStateAction<number | null>>;
  isDraggingGlobal: number | null; // Passing the index or null
  times: string[];
}

// --- Droppable Column Component ---
export const DayColumn: React.FC<DayColumnProps> = ({
  day,
  scheduledEvents,
  darkMode,
  styles,
  calculateTime,
  isResizing,
  setIsResizing,
  isDraggingGlobal,
  times,
}) => {
  const { setNodeRef } = useDroppable({ id: day.id });

  const HOUR_HEIGHT = 80;
  return (
    <div
      ref={setNodeRef}
      className={`flex-1 relative border-r ${styles.border} ${day.isToday ? "bg-blue-500/2" : ""}`}
      style={{ height: `${24 * HOUR_HEIGHT}px` }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {times.map((_, tIdx) => (
          <div key={tIdx} className={`h-20 border-b ${styles.subBorder}`} />
        ))}
      </div>

      <AnimatePresence>
        {scheduledEvents
          .filter((ev) => ev.dayId === day.id)
          .map((event) => (
            <CalendarEvent
              key={scheduledEvents.indexOf(event)}
              idx={scheduledEvents.indexOf(event)}
              event={event}
              darkMode={darkMode}
              calculateTime={calculateTime}
              isResizing={isResizing}
              setIsResizing={setIsResizing}
              isDraggingGlobal={
                isDraggingGlobal === scheduledEvents.indexOf(event)
              }
            />
          ))}
      </AnimatePresence>
    </div>
  );
};
