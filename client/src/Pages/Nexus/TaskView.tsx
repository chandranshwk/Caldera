import { motion, AnimatePresence } from "framer-motion";
import type { CardData } from "./CardView";
import { RxCross2 } from "react-icons/rx";
import { FiEye, FiEyeOff, FiHash } from "react-icons/fi";
import { TbSubtask } from "react-icons/tb";
import { BiCheckCircle, BiChevronUpCircle, BiFlag } from "react-icons/bi";
import {
  LuActivity,
  LuChevronDown,
  LuCircleDashed,
  LuCircleDot,
  LuUser,
} from "react-icons/lu";
import { useEffect, useState } from "react";
import Carasoul from "../../components/Carasoul";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";

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
                <div>
                  {selectedOption === 0 ? (
                    <div className="px-5 mt-4">
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
                                <div className="text-zinc-900 bg-zinc-100 rounded-md p-0.5 ring-1 ring-zinc-200 transition-all duration-300">
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
                                  ? "text-zinc-400 line-through decoration-zinc-300/80 italic"
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
                    <div>An error has occured</div>
                  ) : selectedOption === 2 ? (
                    <div>An error has occured</div>
                  ) : (
                    <div>An error has occured</div>
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

const MetaData = ({
  darkMode,
  task,
}: {
  darkMode: boolean;
  task: CardData;
}) => {
  const getPriorityContent = (p: string) => {
    const configs = {
      High: {
        style: "bg-red-500/10 text-red-500",
        icon: <BiChevronUpCircle className="text-lg" />,
        label: "High",
      },
      Medium: {
        style: "bg-orange-500/10 text-orange-500",
        icon: <LuCircleDashed className="text-lg" />,
        label: "Medium",
      },
      Low: {
        style: "bg-blue-500/10 text-blue-500",
        icon: <LuChevronDown className="text-lg" />,
        label: "Low",
      },
    };

    const current = configs[p as keyof typeof configs] || configs.Low;

    return (
      <div
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md font-bold text-xs uppercase tracking-tight ${current.style}`}
      >
        {current.icon}
        <span>{current.label}</span>
      </div>
    );
  };
  const getStatusContent = (status: string) => {
    const configs = {
      "Not Started": {
        style: "bg-zinc-500/10 text-zinc-500",
        icon: <LuCircleDashed className="text-lg animate-pulse-slow" />,
        label: "To Do",
      },
      "In Progress": {
        style: "bg-blue-500/10 text-blue-500",
        icon: <LuCircleDot className="text-lg" />,
        label: "In Progress",
      },
      Done: {
        style: "bg-emerald-500/10 text-emerald-500",
        icon: <BiCheckCircle className="text-lg" />,
        label: "Done",
      },
    };

    const current =
      configs[status as keyof typeof configs] || configs["Not Started"];

    return (
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold text-[10px] uppercase tracking-wider ${current.style}`}
      >
        {current.icon}
        <span>{current.label}</span>
      </div>
    );
  };
  return (
    <div className={`h-max w-full p-4 rounded-lg shadow `}>
      <MetaDataElements
        darkMode={darkMode}
        icon={<FiHash className="text-lg" />}
        label="Tags"
        value={task.tag}
      />
      <MetaDataElements
        darkMode={darkMode}
        icon={<TbSubtask className="text-lg" />}
        label="Subtasks"
        /* Wrap the number in an array so it renders as one single element */
        value={[`${task.metaData.subtaskLength}`]}
      />

      <MetaDataElements
        darkMode={darkMode}
        icon={<BiFlag className="font-semibold text-lg" />}
        label="Importance"
      >
        <span>{getPriorityContent(task.metaData.Importance)}</span>
      </MetaDataElements>
      <MetaDataElements
        darkMode={darkMode}
        icon={<LuActivity className="text-lg" />}
        label="Current Status"
      >
        {getStatusContent(task.metaData.currentStatus)}
      </MetaDataElements>
      <MetaDataElements
        darkMode={darkMode}
        icon={<LuUser className="text-lg" />}
        label="Assignee"
        img={task.metaData.Assignee.flatMap((assignee) => assignee.avatar)}
      />
    </div>
  );
};

const MetaDataElements = ({
  icon,
  label,
  children,
  value,
  img,
  darkMode,
}: {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactElement;
  value?: string[];
  img?: string[];
  darkMode: boolean;
}) => {
  return (
    <div className="grid grid-cols-[140px_1fr] items-center group min-h-8">
      {/* Label Column */}
      <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
        <span className="text-zinc-400 dark:text-zinc-500 scale-90">
          {icon}
        </span>
        <span>{label}</span>
      </div>

      {/* Value Column */}
      <div className="flex items-center text-sm">
        {children ? (
          <div className="w-full">{children}</div>
        ) : (
          <span className="text-zinc-900 dark:text-zinc-200 font-medium">
            {value?.length === 1 ? (
              <div
                className={`${darkMode ? "text-white/60" : "text-black/60"}`}
              >
                {value || "Empty"}
              </div>
            ) : (
              // For your Tag Map
              <div className="flex flex-wrap gap-2">
                {value?.map((v, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${darkMode ? "bg-zinc-700/40 text-zinc-300 border border-zinc-600/50" : "bg-zinc-500/10 text-zinc-500 border border-zinc-500/10"}`}
                  >
                    {v}
                  </span>
                ))}
              </div>
            )}
            {img && img.length > 0 && (
              <div className="flex items-center ml-1">
                {img.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="assignee"
                    className={`h-6 w-6 rounded-full object-cover border border-white dark:border-zinc-900 shadow-sm transition-transform hover:z-10 hover:scale-110 ${idx !== 0 ? "-ml-2" : "ml-0"} `}
                    style={{ zIndex: img.length - idx }}
                  />
                ))}
              </div>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskView;
