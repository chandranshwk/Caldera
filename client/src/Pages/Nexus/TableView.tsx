import { FiClock } from "react-icons/fi";
import { PiDotsThreeBold } from "react-icons/pi";
import { TbSubtask, TbUser } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";

interface TableViewProps {
  darkMode: boolean;
  DATA: {
    name: string;
    des: string;
    tag: string[];
    metaData: {
      subtaskLength: number;
      subtask: string[];
      currentStatus: "Not Started" | "In Progress" | "Done";
      Importance: "High" | "Medium" | "Low";
      Time: string;
      Assignee: string[];
      AssigneeNumber: number;
    };
    progress: number;
  }[];
}

const TableView: React.FC<TableViewProps> = ({ darkMode, DATA }) => {
  return (
    <div className={`shaodw-md ${darkMode ? "bg-zinc-900/20" : "bg-white"} `}>
      <table className={`w-full shadow-md rounded-lg`}>
        <tbody className="flex flex-col gap-2">
          {DATA.map((data, idx) => (
            <tr
              key={idx}
              className={`rounded-lg flex text-center justify-between transition-all duration-100 items-center border-transparent  border ${darkMode ? "bg-zinc-950/30 hover:bg-indigo-800/10 hover:border-indigo-700" : "bg-white hover:bg-indigo-300/10 hover:border-indigo-700"} `}
            >
              {/* Column 1: Name & Tag */}
              <td className="px-6 py-4 w-95">
                <div className="flex flex-col gap-0.5 text-left">
                  {/* Main Name */}
                  <span
                    className={`font-bold text-[16px] tracking-tight line-clamp-2 ${darkMode ? "text-zinc-100" : "text-zinc-800"}`}
                  >
                    {data.name}
                  </span>

                  {/* Tags Row */}
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
              </td>

              {/* Column 2: Metadata */}
              <td className="flex items-center gap-3 py-4 w-96">
                {/* Subtask - White Sticker Style */}
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
                  {data.metaData.AssigneeNumber}
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

                {/* Importance Badge - Unique Colors for High, Medium, Low */}
                <div
                  className={`flex items-center px-3 py-1 text-[11px] font-bold rounded-md ${
                    data.metaData.Importance === "High"
                      ? darkMode
                        ? "bg-rose-900/30 text-rose-200"
                        : "bg-[#FFE4E6] text-[#9F1239]" // Red/Rose
                      : data.metaData.Importance === "Medium"
                        ? darkMode
                          ? "bg-purple-900/30 text-purple-200"
                          : "bg-[#EBE4FF] text-[#4F3E8E]" // Purple/Lavender
                        : darkMode
                          ? "bg-cyan-900/30 text-cyan-200"
                          : "bg-[#E0F7FA] text-[#006064]" // Teal/Cyan
                  }`}
                >
                  {data.metaData.Importance}
                </div>

                {/* Time - Clean Text with Icon */}
                <div
                  className={`flex items-center gap-1.5 text-[11px] font-bold ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  <FiClock size={14} />
                  {data.metaData.Time}
                </div>
              </td>

              {/* Column 3: Progress */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {/* The Track */}
                  <div
                    className={`w-32 h-2 rounded-full overflow-hidden ${darkMode ? "bg-zinc-800" : "bg-zinc-100"}`}
                  >
                    {/* The Progress Fill */}
                    <div
                      className={`h-full transition-all duration-500 ease-out rounded-full ${darkMode ? "bg-indigo-400" : "bg-zinc-950"}`}
                      style={{ width: `${data.progress}%` }}
                    />
                  </div>

                  {/* Percentage Label */}
                  <span
                    className={`text-[11px] font-bold w-8 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
                  >
                    {data.progress}%
                  </span>
                </div>
              </td>

              {/* Column 4: Actions */}
              <td className="px-4 text-right">
                <button
                  className={`p-2 rounded-lg transition-all duration-200 ${darkMode ? "text-zinc-400 hover:bg-white/10 hover:text-zinc-100" : "text-zinc-400 hover:bg-black/5 hover:text-zinc-800"}`}
                >
                  <PiDotsThreeBold size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
