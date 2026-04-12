import { FiClock } from "react-icons/fi";
import { PiDotsThreeBold } from "react-icons/pi";
import { TbSubtask, TbUser } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import type { CardData } from "./CardView";

interface TableViewProps {
  darkMode: boolean;
  DATA: CardData[];
  selectedTask: CardData | null;
  setSelectedTask: (card: CardData) => void;
}

const TableView: React.FC<TableViewProps> = ({
  darkMode,
  DATA,
  selectedTask,
  setSelectedTask,
}) => {
  return (
    <div
      className={`shadow-md rounded-lg overflow-hidden ${darkMode ? "bg-zinc-900/20" : "bg-white"}`}
    >
      {/* Changed from table to div to support flex layout properly */}
      <div className="flex flex-col gap-2 w-full p-1">
        {DATA.map((data, idx) => {
          const img = data.metaData.Assignee.flatMap(
            (assignee) => assignee.avatar,
          );
          return (
            <div
              key={idx}
              onClick={() => {
                setSelectedTask(data);
              }}
              className={`
              rounded-lg flex text-center justify-between transition-all duration-100 items-center border 
              cursor-pointer select-none px-2
              ${
                darkMode
                  ? "bg-zinc-950/30 border-transparent hover:bg-indigo-800/10 hover:border-indigo-700 text-zinc-100"
                  : "bg-white border-transparent hover:bg-indigo-300/10 hover:border-indigo-700 text-zinc-800"
              }
              ${selectedTask?.name === data.name ? (darkMode ? "border-indigo-500 bg-indigo-500/10" : "border-indigo-500 bg-indigo-50") : ""}
            `}
            >
              {/* Column 1: Name & Tag */}
              <div
                className="px-6 py-4 w-95 shrink-0"
                onClick={() => setSelectedTask(data)}
              >
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="font-bold text-[16px] tracking-tight line-clamp-2">
                    {data.name}
                  </span>
                  <div className="flex items-center gap-3">
                    {data.tag.map((tag) => (
                      <span
                        key={uuidv4()}
                        className={`text-[11px] font-semibold tracking-wide uppercase opacity-60 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 2: Metadata */}
              <div className="flex items-center gap-3 py-4 w-124 shrink-0">
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-md border ${darkMode ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-white border-zinc-100 text-zinc-600 shadow-sm"}`}
                >
                  <TbSubtask size={14} className="opacity-70" />
                  {data.metaData.subtaskLength}
                </div>
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-md border ${darkMode ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-white border-zinc-100 text-zinc-600 shadow-sm"}`}
                >
                  <TbUser size={14} className="opacity-70" />
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
                </div>

                {/* Status Badge */}
                <div
                  className={`flex items-center px-3 py-1 text-[11px] font-bold rounded-md ${
                    data.metaData.currentStatus === "Not Started"
                      ? darkMode
                        ? "bg-orange-900/30 text-orange-200"
                        : "bg-[#FEEADF] text-[#7A3E26]"
                      : data.metaData.currentStatus === "In Progress"
                        ? darkMode
                          ? "bg-blue-900/30 text-blue-200"
                          : "bg-[#E0F2FE] text-[#0369A1]"
                        : darkMode
                          ? "bg-emerald-900/30 text-emerald-200"
                          : "bg-[#DCFCE7] text-[#15803D]"
                  }`}
                >
                  {data.metaData.currentStatus}
                </div>

                {/* Importance Badge */}
                <div
                  className={`flex items-center px-3 py-1 text-[11px] font-bold rounded-md ${
                    data.metaData.Importance === "High"
                      ? darkMode
                        ? "bg-rose-900/30 text-rose-200"
                        : "bg-[#FFE4E6] text-[#9F1239]"
                      : data.metaData.Importance === "Medium"
                        ? darkMode
                          ? "bg-purple-900/30 text-purple-200"
                          : "bg-[#EBE4FF] text-[#4F3E8E]"
                        : darkMode
                          ? "bg-cyan-900/30 text-cyan-200"
                          : "bg-[#E0F7FA] text-[#006064]"
                  }`}
                >
                  {data.metaData.Importance}
                </div>

                <div
                  className={`flex items-center gap-1.5 text-[11px] font-bold ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  <FiClock size={14} />
                  {data.metaData.Time}
                </div>
              </div>

              {/* Column 3: Progress */}
              <div className="px-6 py-4 grow flex justify-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-32 h-2 rounded-full overflow-hidden ${darkMode ? "bg-zinc-800" : "bg-zinc-100"}`}
                  >
                    <div
                      className={`h-full transition-all duration-500 ease-out rounded-full ${darkMode ? "bg-indigo-400" : "bg-zinc-950"}`}
                      style={{ width: `${data.progress}%` }}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-bold w-8 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
                  >
                    {data.progress}%
                  </span>
                </div>
              </div>

              {/* Column 4: Actions */}
              <div className="px-4 text-right">
                <button
                  onClick={(e) => e.stopPropagation()} // Important: stop click from selecting the row
                  className={`p-2 rounded-lg transition-all duration-200 relative z-20 ${darkMode ? "text-zinc-400 hover:bg-white/10 hover:text-zinc-100" : "text-zinc-400 hover:bg-black/5 hover:text-zinc-800"}`}
                >
                  <PiDotsThreeBold size={24} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableView;
