import type { User } from "@supabase/supabase-js";
import { useNavigate, useOutletContext } from "react-router-dom";
import Carasoul from "../../components/Carasoul";
import type { FILTERTYPE } from "./Nexus";
import type { CardData } from "./CardView";
import { IoIosArrowUp, IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";
import { useMemo, useState } from "react";

const NDashboard = () => {
  const { user, darkMode, data, setData } = useOutletContext<{
    user: User;
    darkMode: boolean;
    RECOMMENDFILTER: FILTERTYPE[];
    data: CardData[];
    setData: React.Dispatch<React.SetStateAction<CardData[]>>;
  }>();
  console.log(darkMode);
  console.log(user.email);

  // Change taskIndex: number to taskId: string
  const toggleAllSubtasks = (taskId: string) => {
    setData((prevData) => {
      return prevData.map((task) => {
        // ! FIX: Match by unique ID, not by array position
        if (task.id !== taskId) return task;

        const allDone = task.metaData.subtask.every((st) => st.isCompleted);
        const cond = !allDone;

        const updatedSubtasks = task.metaData.subtask.map((sub) => ({
          ...sub,
          isCompleted: cond,
        }));

        return {
          ...task,
          progress: cond ? 100 : 0,
          metaData: {
            ...task.metaData,
            subtask: updatedSubtasks,
            // Correct the status logic while you're at it
            currentStatus: cond ? "Done" : "To-Do",
          },
        };
      });
    });
  };

  const [view, setView] = useState<number>(0);
  const options = [
    { name: "All", exec: () => setView(0) },
    { name: "In-Progress", exec: () => setView(1) },
    { name: "To-Do", exec: () => setView(2) },
    { name: "Done", exec: () => setView(3) },
    { name: "Priority - High", exec: () => setView(4) },
    { name: "Priority - Medium", exec: () => setView(5) },
    { name: "Priority - Low", exec: () => setView(6) },
  ];

  const DATA = useMemo(() => {
    let filtered = data;
    switch (view) {
      case 0:
        filtered = data;
        break;
      case 1:
        filtered = data.filter(
          (data) => data.progress > 0 && data.progress < 100,
        );
        break;
      case 2:
        filtered = data.filter((data) => data.progress === 0);
        break;
      case 3:
        filtered = data.filter((data) => data.progress === 100);
        break;
      case 4:
        filtered = data.filter((data) => data.metaData.Importance === "High");
        break;
      case 5:
        filtered = data.filter((data) => data.metaData.Importance === "Medium");
        break;
      case 6:
        filtered = data.filter((data) => data.metaData.Importance === "Low");
        break;
    }
    return filtered;
  }, [data, view]);

  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-row min-h-screen gap-6 transition-colors duration-300 `}
    >
      {/* Left Section: Main Content */}
      <div
        className={`flex-1  border px-6 py-2 transition-all ${darkMode ? "bg-zinc-950/20 border-zinc-800" : "bg-zinc-100/50 border-zinc-100"}`}
      >
        <div
          className={`border-b ${darkMode ? "border-zinc-800" : "border-zinc-200/60"}`}
        >
          <Carasoul darkMode={darkMode} view={view} options={options} />
        </div>

        <div className="mb-5 mt-7 space-y-3">
          {DATA.map((task, idx) => (
            <div
              key={idx}
              className={`group flex items-stretch overflow-hidden rounded-xl border transition-all duration-200 ${
                darkMode
                  ? "bg-zinc-900/40 border-zinc-800/50 hover:border-zinc-700"
                  : "bg-white border-zinc-200/60 hover:border-zinc-300"
              }`}
            >
              {/* LEFT SECTION: Toggle Logic */}
              <div
                className={`flex-1 flex flex-col p-4 cursor-pointer transition-colors ${
                  darkMode ? "hover:bg-zinc-800/30" : "hover:bg-zinc-50/50"
                }`}
                onClick={() => toggleAllSubtasks(task.id)}
              >
                <div className="flex items-center mb-2.5">
                  <div className="transition-transform duration-200 active:scale-90">
                    {task.progress === 100 ? (
                      <IoIosCheckbox
                        size={22}
                        className={
                          darkMode ? "text-indigo-400" : "text-zinc-900"
                        }
                      />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        size={22}
                        className={darkMode ? "text-zinc-600" : "text-zinc-300"}
                      />
                    )}
                  </div>
                  <span
                    className={`ml-3 font-bold text-sm tracking-tight ${
                      task.progress === 100
                        ? darkMode
                          ? "text-zinc-600 line-through"
                          : "text-zinc-400 line-through"
                        : darkMode
                          ? "text-zinc-200"
                          : "text-zinc-800"
                    }`}
                  >
                    {task.name}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="ml-8.5 space-y-1.5 w-1/3 min-w-30">
                  <div className="flex justify-between text-[10px] font-semibold tracking-widest text-zinc-500">
                    <span>
                      {task.progress === 100
                        ? "COMPLETE"
                        : task.progress === 0
                          ? "TO-DO"
                          : "IN-PROGRESS"}
                    </span>
                    <span>{task.progress}%</span>
                  </div>
                  <div
                    className={`h-1 w-full rounded-full overflow-hidden ${darkMode ? "bg-zinc-800" : "bg-zinc-200/50"}`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        task.progress === 100
                          ? darkMode
                            ? "bg-emerald-500/80"
                            : "bg-emerald-600"
                          : darkMode
                            ? "bg-indigo-500"
                            : "bg-zinc-900"
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT SECTION: Navigation Hitbox (The "Manage" Zone) */}
              <div
                onClick={() => navigate("/nexus/manage")}
                className={`flex items-center gap-4 px-6 cursor-pointer border-l transition-all duration-200 group/nav ${
                  darkMode
                    ? "border-zinc-800/50 hover:bg-indigo-500/10"
                    : "border-zinc-100 hover:bg-zinc-100"
                }`}
              >
                <div
                  className={`flex items-center justify-center gap-1.5 w-21.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg border shadow-sm transition-all duration-300 ${
                    task.metaData.Importance === "High"
                      ? darkMode
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20 group-hover/nav:shadow-[0_0_12px_rgba(244,63,94,0.3)]"
                        : "bg-rose-50 text-rose-700 border-rose-100"
                      : task.metaData.Importance === "Medium"
                        ? darkMode
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover/nav:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                          : "bg-purple-50 text-purple-700 border-purple-100"
                        : darkMode
                          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 group-hover/nav:shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                          : "bg-cyan-50 text-cyan-700 border-cyan-100"
                  }`}
                >
                  {task.metaData.Importance === "High" && (
                    <RxDoubleArrowUp size={12} className="shrink-0" />
                  )}
                  {task.metaData.Importance === "Medium" && (
                    <IoIosArrowUp size={12} className="shrink-0" />
                  )}
                  {task.metaData.Importance === "Low" && (
                    <RxDoubleArrowDown size={12} className="shrink-0" />
                  )}

                  <span>{task.metaData.Importance}</span>
                </div>

                <IoIosArrowUp
                  className={`rotate-90 transition-transform duration-300 group-hover/nav:translate-x-1 ${
                    darkMode
                      ? "text-zinc-600 group-hover/nav:text-zinc-400"
                      : "text-zinc-300 group-hover/nav:text-zinc-600"
                  }`}
                  size={18}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Schedule */}
      <div
        className={`w-1/3 border p-6 transition-all ${
          darkMode
            ? "bg-zinc-950/20 border-zinc-800"
            : "bg-zinc-100/50 border-zinc-100"
        }`}
      >
        <h2
          className={`text-xs font-black uppercase tracking-[0.2em] mb-6 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}
        >
          Upcoming Schedule
        </h2>
        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-xl border-zinc-800/40">
          <span className="text-xs font-medium text-zinc-500">
            No events scheduled
          </span>
        </div>
      </div>
    </div>
  );
};

export default NDashboard;
