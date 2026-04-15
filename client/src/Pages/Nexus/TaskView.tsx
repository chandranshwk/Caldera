import { motion, AnimatePresence } from "framer-motion";
import type { CardData } from "./CardView";
import { RxCross2 } from "react-icons/rx";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";
import Carasoul from "../../components/Carasoul";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import MetaData from "./MetaData";

interface TaskViewProps {
  darkMode: boolean;
  task: CardData | null;
  isOpen: boolean;
  setSelectedTask: (value: CardData | null) => void;
  toggleSubtask: (value: number) => void;
}

const TaskView: React.FC<TaskViewProps> = ({
  darkMode,
  task,
  isOpen,
  setSelectedTask,
  toggleSubtask,
}) => {
  const [showFullDes, setShowFullDes] = useState<boolean>(false);
  const [showMetaData, setShowMetaData] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  if (!task) return null;

  const handleClose = () => setSelectedTask(null);

  const options = [
    { name: "Subtasks", exec: () => setSelectedOption(0) },
    { name: "Activity", exec: () => setSelectedOption(1) },
    { name: "Comments", exec: () => setSelectedOption(2) },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Optional but recommended for Notion feel) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-10"
          />

          {/* The Side Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 h-full z-50 flex flex-col shadow-2xl border-l ${
              darkMode
                ? "bg-[#1c1c1c] border-zinc-800 text-zinc-300"
                : "bg-white border-zinc-200 text-zinc-900"
            } w-full md:w-[calc(100%-4.2rem)] lg:w-162.5`}
          >
            {/* Header */}
            <div className="p-4 flex relative z-10 items-center justify-between border-b border-zinc-500/10">
              <button
                onClick={handleClose}
                className="p-2 hover:bg-zinc-500/10 rounded-lg transition-colors"
              >
                <RxCross2 className="text-xl" />
              </button>
              <div className="text-xs font-mono opacity-50 uppercase tracking-widest">
                Task Details
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 pt-3">
              <h1 className="text-3xl font-bold mb-6 flex justify-between items-start gap-4">
                <span className="flex-1">{task.name}</span>

                <div
                  onClick={() => setShowMetaData((prev) => !prev)}
                  className="group relative text-lg h-max w-max p-2 mt-1 bg-zinc-200/40 rounded-md hover:bg-zinc-600/10 transition-all duration-100 cursor-pointer shrink-0"
                >
                  {/* Tooltip Label - Positioned below the icon */}
                  <div className="absolute z-100 top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-xl">
                    {showMetaData ? "Hide Meta-Data" : "Show Meta-Data"}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-l-4 border-l-transparent border-r-4 border-r-transparent border-bottom-4 border-b-zinc-800" />
                  </div>

                  {showMetaData ? <FiEye /> : <FiEyeOff />}
                </div>
              </h1>

              {/* Meta-Data */}
              {showMetaData && <MetaData darkMode={darkMode} task={task} />}
              {/* Project Description */}
              <div
                className={`h-max w-full flex flex-col gap-3 p-5 rounded-xl mt-4 border transition-all ${darkMode ? "bg-zinc-800/20 border-zinc-700/50 shadow-inner" : "bg-zinc-50/20 border-zinc-200/60 shadow-sm"}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1 h-3 rounded-full ${darkMode ? "bg-indigo-500" : "bg-indigo-600"}`}
                  />
                  <span
                    className={`text-[11px] uppercase tracking-widest font-black ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}
                  >
                    Description
                  </span>
                </div>

                <p
                  className={`text-sm font-medium leading-5 whitespace-pre-wrap ${darkMode ? "text-zinc-300" : "text-slate-700"}`}
                >
                  {/* Standard length check - button only appears if needed */}
                  {showFullDes || task.des.length <= 250
                    ? task.des
                    : `${task.des.substring(0, task.des.lastIndexOf(" ", 250) || 250)}... `}

                  {task.des.length > 250 && (
                    <button
                      onClick={() => setShowFullDes(!showFullDes)}
                      className={`font-semibold ml-1 hover:underline focus:outline-none focus:ring-0 rounded px-1 transition-colors ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
                    >
                      {showFullDes ? "Show Less" : "Read More"}
                    </button>
                  )}
                </p>
              </div>
              {/* Main Data */}
              <div>
                {/* carasoul selection */}
                <Carasoul
                  darkMode={darkMode}
                  options={options}
                  view={selectedOption}
                />
                <div className="w-full">
                  {selectedOption === 0 ? (
                    <div className="px-4 mt-4 w-full">
                      {/* Progress */}
                      <div className="space-y-1.5 mb-4">
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
                      {/* Subtasks */}
                      <div className="flex flex-col mt-2">
                        {task.metaData.subtask.map((st, idx) => (
                          <div
                            key={idx}
                            className="group w-full flex items-center gap-4 py-3 px-2 rounded-xl transition-all duration-200 hover:bg-zinc-500/5 cursor-pointer"
                            onClick={() => toggleSubtask(idx)}
                          >
                            {/* Custom Styled Checkbox Container */}
                            <div className="flex items-center justify-center">
                              {st.isCompleted ? (
                                <div
                                  className={`${darkMode ? "text-zinc-100" : "text-zinc-900"} rounded-md transition-all duration-300`}
                                >
                                  <IoIosCheckbox size={20} />
                                </div>
                              ) : (
                                <div className="text-zinc-300 group-hover:text-zinc-400 transition-colors duration-200">
                                  <MdOutlineCheckBoxOutlineBlank size={20} />
                                </div>
                              )}
                            </div>

                            {/* Task Text with Completion Styles */}
                            <span
                              className={`text-sm transition-all duration-300 ${
                                st.isCompleted
                                  ? darkMode
                                    ? "text-zinc-400 line-through decoration-zinc-300/80 italic"
                                    : "text-zinc-800 line-through decoration-zinc-300/80 italic"
                                  : darkMode
                                    ? "text-zinc-200 font-medium"
                                    : "text-zinc-700 font-medium"
                              }`}
                            >
                              {st.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : selectedOption === 1 ? (
                    <div className="px-5 mt-4 w-full">Coming Soon...</div>
                  ) : selectedOption === 2 ? (
                    <div className="px-5 mt-4 w-full">Coming soon...</div>
                  ) : (
                    <div className="px-5 mt-4 w-full">An error has occured</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskView;
