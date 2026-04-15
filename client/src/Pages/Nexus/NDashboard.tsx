import type { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Carasoul from "../../components/Carasoul";
import type { FILTERTYPE } from "./Nexus";
import type { CardData } from "./CardView";
import { IoIosArrowUp, IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";

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

  const [view, setView] = useState<number>(0);
  const options = [
    { name: "All", exec: () => setView(0) },
    { name: "To-Do", exec: () => setView(1) },
    { name: "Not Started", exec: () => setView(2) },
    { name: "Completed", exec: () => setView(3) },
    { name: "Priority - High", exec: () => setView(4) },
    { name: "Priority - Medium", exec: () => setView(5) },
    { name: "Priority - Low", exec: () => setView(6) },
  ];

  const toggleAllSubtasks = (taskIndex: number) => {
    setData((prevData) => {
      return prevData.map((task, idx) => {
        if (idx !== taskIndex) return task;
        //Check All Subtasks, if everyhting is true then allDone is true and vice-versa
        const allDone = task.metaData.subtask.every((st) => st.isCompleted);
        //if allDone is false, then it means that all subtasks are not completed, if it is so then cond is true and vice-versa
        const cond = !allDone;

        // 1. Mark all subtasks as completed
        const updatedSubtasks = task.metaData.subtask.map((sub) => ({
          ...sub,
          isCompleted: cond,
        }));

        // If cond is true then progress is set to 100 and vice-versa (already done tasks are not preserved)
        return {
          ...task,
          progress: cond ? 100 : 0,
          metaData: {
            ...task.metaData,
            subtask: updatedSubtasks,
            currentStatus: "Done",
          },
        };
      });
    });
    console.log(data);
  };

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
          {data.map((task, idx) => (
            <div
              key={idx}
              className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                darkMode
                  ? "bg-zinc-900/40 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-800/40"
                  : "bg-white border-zinc-200/60 hover:border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              {/* Task Info & Progress */}
              <div
                className="flex flex-col flex-1 cursor-pointer"
                onClick={() => toggleAllSubtasks(idx)}
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

                {/* Progress Bar Container */}
                <div className="ml-8.5 space-y-1.5 w-1/3 min-w-30">
                  <div className="flex justify-between text-[10px] font-semibold tracking-widest text-zinc-500">
                    <span>
                      {task.progress === 100
                        ? "COMPLETE"
                        : task.progress === 0
                          ? "NOT STARTED"
                          : "IN PROGRESS"}
                    </span>
                    <span>{task.progress}%</span>
                  </div>
                  <div
                    className={`h-1.5 w-full rounded-full overflow-hidden ${darkMode ? "bg-zinc-800" : "bg-zinc-200/50"}`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-in-out ${
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

              {/* Right Section: Priority Badge */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg border shadow-sm ${
                    task.metaData.Importance === "High"
                      ? darkMode
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : "bg-rose-50 text-rose-700 border-rose-100"
                      : task.metaData.Importance === "Medium"
                        ? darkMode
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : "bg-purple-50 text-purple-700 border-purple-100"
                        : darkMode
                          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                          : "bg-cyan-50 text-cyan-700 border-cyan-100"
                  }`}
                >
                  {task.metaData.Importance === "High" && (
                    <RxDoubleArrowUp size={12} />
                  )}
                  {task.metaData.Importance === "Medium" && (
                    <IoIosArrowUp size={12} />
                  )}
                  {task.metaData.Importance === "Low" && (
                    <RxDoubleArrowDown size={12} />
                  )}
                  <span>{task.metaData.Importance}</span>
                </div>

                <IoIosArrowUp
                  className={`rotate-90 transition-all duration-300 ${
                    darkMode
                      ? "text-zinc-700 group-hover:text-zinc-400"
                      : "text-zinc-300 group-hover:text-zinc-500"
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
