import { useDraggable, useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { ScheduledEvent } from "./Calendar";

interface CalendarEventProps {
  event: ScheduledEvent;
  idx: number;
  darkMode: boolean;
  calculateTime: (pixels: number) => string;
  isResizing: number | null;
  setIsResizing: React.Dispatch<React.SetStateAction<number | null>>;
  isDraggingGlobal: boolean; // Boolean based on your previous usage logic
}

// --- Draggable Event Component ---
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

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `event-${idx}`,
    data: { idx, type: "move" },
    // 1. Logic: If not "canDrag", the drag handle is disabled
    disabled: !canDrag || isResizing !== null,
  });

  const handleDoubleClick = () => {
    setCanDrag(true);
  };

  // Reset drag ability when drag ends
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isDraggingGlobal) {
      setCanDrag(false);
    }
  }, [isDraggingGlobal]);

  return (
    <motion.div
      ref={setNodeRef}
      onDoubleClick={handleDoubleClick}
      layout
      animate={{
        top: event.top + (transform?.y || 0),
        height: event.height,
        zIndex: canDrag ? 50 : 20,
        scale: canDrag ? 1.02 : 1,
        boxShadow: canDrag
          ? "0 10px 15px -3px rgba(0,0,0,0.1)"
          : "0 1px 2px rgba(0,0,0,0.05)",
      }}
      className={`absolute left-1 right-1 p-2 rounded-lg border select-none group 
        ${darkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"} 
        ${isResizing === idx ? "cursor-ns-resize" : "cursor-grab active:cursor-grabbing"} overflow-hidden`}
      {...listeners}
      {...attributes}
    >
      <div className="flex flex-col h-full pointer-events-none">
        <span className="text-[10px] font-bold text-blue-500">
          {calculateTime(event.top + (transform?.y || 0))} -{" "}
          {calculateTime(event.top + (transform?.y || 0) + event.height)}
        </span>
        <span className="text-xs font-bold truncate">{event.name}</span>
      </div>

      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsResizing(idx);
        }}
        className="absolute bottom-0 left-0 right-0 h-3 cursor-ns-resize z-50"
      >
        <div className="mx-auto w-8 h-1 mt-1 rounded-full bg-zinc-500/20 group-hover:bg-blue-500/40" />
      </div>
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
