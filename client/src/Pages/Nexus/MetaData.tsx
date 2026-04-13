import { TbSubtask } from "react-icons/tb";
import { BiCheckCircle, BiChevronUpCircle, BiFlag } from "react-icons/bi";
import {
  LuActivity,
  LuChevronDown,
  LuCircleDashed,
  LuCircleDot,
  LuUser,
} from "react-icons/lu";
import type { CardData } from "./CardView";
import { FiHash } from "react-icons/fi";
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

export default MetaData;
