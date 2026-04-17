import { useOutletContext } from "react-router-dom";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState, useMemo, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import type { CardData } from "./CardView";
import Dropdown, { type MenuItem } from "../../components/Dropdown";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { createSnapModifier } from "@dnd-kit/modifiers";
import { DayColumn } from "./DraggableEvent";

export interface ScheduledEvent extends CardData {
  top: number;
  height: number;
  dayId: string;
}

const Calendar = () => {
  const { darkMode, data } = useOutletContext<{
    darkMode: boolean;
    data: CardData[];
  }>();
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>([]);
  const [isResizing, setIsResizing] = useState<number | null>(null);
  const [isDraggingGlobal, setIsDraggingGlobal] = useState<number | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const styles = useMemo(
    () => ({
      border: darkMode ? "border-zinc-800" : "border-zinc-500/50",
      bg: darkMode ? "bg-zinc-950/60" : "bg-white",
      text: darkMode ? "text-white" : "text-zinc-900",
      hover: darkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100",
      subBorder: !darkMode ? "border-zinc-900/30" : "border-zinc-400/30",
      stickyHeader: darkMode ? "bg-zinc-950/95" : "bg-white/95",
    }),
    [darkMode],
  );

  const snapToGrid = createSnapModifier(20);
  const HOUR_HEIGHT = 80;

  const days = useMemo(() => {
    const arr = [];
    const now = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - now.getDay() + weekOffset * 7);
    for (let i = 0; i < 7; i++) {
      const current = new Date(startOfWeek);
      current.setDate(startOfWeek.getDate() + i);
      arr.push({
        id: current.toDateString(),
        dayName: current.toLocaleDateString("en-UK", { weekday: "long" }),
        dayNumber: current.getDate(),
        isToday: current.toDateString() === now.toDateString(),
      });
    }
    return arr;
  }, [weekOffset]);

  const times = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
        return `${hour}:00 ${i >= 12 ? "PM" : "AM"}`;
      }),
    [],
  );

  const calculateTime = (pixels: number) => {
    const totalMinutes = (pixels / HOUR_HEIGHT) * 60;
    const hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = Math.floor(totalMinutes % 60);
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDraggingGlobal(null);
    const { active, over, delta } = event;
    if (!over) return;

    const idx = active.data.current?.idx;
    setScheduledEvents((prev) =>
      prev.map((ev, i) => {
        if (i !== idx) return ev;
        const newTop = Math.max(0, Math.round((ev.top + delta.y) / 20) * 20);
        return { ...ev, top: newTop, dayId: over.id as string };
      }),
    );
  };

  // Resizing logic stays manual since dnd-kit is better for translation
  useEffect(() => {
    if (isResizing === null) return;
    const handleMove = (e: MouseEvent) => {
      setScheduledEvents((prev) =>
        prev.map((ev, i) => {
          if (i !== isResizing) return ev;
          return {
            ...ev,
            height: Math.max(
              20,
              Math.round((ev.height + e.movementY) / 20) * 20,
            ),
          };
        }),
      );
    };
    const handleUp = () => setIsResizing(null);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isResizing]);

  const options: MenuItem[] = data.flatMap((d, idx) => ({
    label: d.name,
    onClick: () =>
      setScheduledEvents([
        ...scheduledEvents,
        { ...d, top: 0, height: HOUR_HEIGHT, dayId: new Date().toDateString() },
      ]),
    icon: (
      <div
        key={idx}
        className={`size-1.5 rounded-full ${darkMode ? "bg-blue-500" : "bg-blue-400"}`}
      />
    ),
  }));

  return (
    <DndContext
      sensors={sensors}
      modifiers={[snapToGrid]}
      onDragStart={(e) => setIsDraggingGlobal(e.active.data.current?.idx)}
      onDragEnd={handleDragEnd}
    >
      <div
        className={`flex flex-col h-screen overflow-hidden ${styles.bg} ${styles.text}`}
      >
        <div
          className={`flex items-center justify-between p-4 md:p-6 border-b ${styles.border}`}
        >
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Weekly Schedule
          </h1>
          <div className="flex items-center gap-5">
            <div className="flex gap-2">
              <button
                onClick={() => setWeekOffset((p) => p - 1)}
                className={`p-2 rounded-xl border ${styles.border} ${styles.hover}`}
              >
                <LuChevronLeft />
              </button>
              <button
                onClick={() => setWeekOffset(0)}
                className={`px-4 py-1 text-sm font-bold border rounded-xl ${styles.border} ${styles.hover}`}
              >
                Today
              </button>
              <button
                onClick={() => setWeekOffset((p) => p + 1)}
                className={`p-2 rounded-xl border ${styles.border} ${styles.hover}`}
              >
                <LuChevronRight />
              </button>
            </div>
            <Dropdown
              trigger={
                <div className="h-max w-max p-2 rounded-full bg-blue-500 text-white cursor-pointer">
                  <MdAdd />
                </div>
              }
              darkMode={darkMode}
              items={options}
              width="w-[20rem]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto relative">
          <div className="min-w-250 flex flex-col">
            <div className="sticky top-0 z-40 flex border-b bg-inherit">
              <div className="w-20 border-r" />
              {days.map((day) => (
                <div
                  key={day.id}
                  className={`flex-1 h-20 flex flex-col items-center justify-center border-r ${styles.border} ${day.isToday ? "bg-blue-500/5" : ""}`}
                >
                  <span className="text-xs uppercase font-bold text-zinc-400">
                    {day.dayName}
                  </span>
                  <span
                    className={`text-2xl font-bold ${day.isToday ? "text-blue-500" : ""}`}
                  >
                    {day.dayNumber}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex">
              <div
                className={`sticky left-0 z-30 w-20 flex-none border-r ${styles.border} ${styles.bg}`}
              >
                {times.map((time, idx) => (
                  <div
                    key={idx}
                    className="h-20 pr-2 flex justify-end text-[10px] font-bold text-zinc-400 pt-2"
                  >
                    {time}
                  </div>
                ))}
              </div>
              <div className="flex flex-1">
                {days.map((day) => (
                  <DayColumn
                    key={day.id}
                    day={day}
                    times={times}
                    styles={styles}
                    darkMode={darkMode}
                    calculateTime={calculateTime}
                    scheduledEvents={scheduledEvents}
                    isResizing={isResizing}
                    setIsResizing={setIsResizing}
                    isDraggingGlobal={isDraggingGlobal}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default Calendar;
