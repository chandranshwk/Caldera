import type { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Carasoul from "../../components/Carasoul";
import type { FILTERTYPE } from "./Nexus";
import type { CardData } from "./CardView";
import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

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

        // 2. Set progress to 100 and status to "Done"
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
      className={`flex flex-row min-h-screen gap-4 justify-between transition-colors duration-300`}
    >
      <div className="bg-zinc-200/20 px-4 w-2/3">
        <div className="border-b border-zinc-500/60">
          <Carasoul darkMode={darkMode} view={view} options={options} />
        </div>
        <div className="mb-5 mt-7">
          {data.map((task, idx) => (
            <div key={idx}>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => toggleAllSubtasks(idx)}
              >
                {task.progress === 100 ? (
                  <IoIosCheckbox
                    size={20}
                    className={darkMode ? "text-zinc-100" : "text-zinc-900"}
                  />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    size={20}
                    className="text-zinc-300"
                  />
                )}
                <span className="ml-2">{task.name}</span>
              </div>

              <div className="space-y-1.5 mb-4 w-1/6">
                <div className="flex justify-between text-[9px] font-bold text-zinc-400">
                  <span>PROGRESS</span>
                  <span>{task.progress}%</span>
                </div>
                <div
                  className={`h-1 w-full rounded-full ${darkMode ? "bg-zinc-800" : "bg-zinc-100"}`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${darkMode ? "bg-indigo-500" : "bg-zinc-900"}`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-zinc-200/20 w-1/3">Schedule</div>
    </div>
  );
};

export default NDashboard;
