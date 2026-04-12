import { FiClock, FiMoreVertical } from "react-icons/fi";
import { MdOutlineDragIndicator } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import type { CardData } from "./CardView";

const CardUI = ({
  data,
  darkMode,
  isOverlay = false,
}: {
  data: CardData;
  darkMode: boolean;
  isOverlay?: boolean;
  setSelectedTask: (card: CardData) => void;
}) => (
  <div
    className={`group flex flex-col rounded-lg border transition-all duration-300 
      ${isOverlay ? "shadow-2xl cursor-grabbing" : ""}
      ${
        darkMode
          ? "bg-zinc-900 border-zinc-800 shadow-2xl hover:border-indigo-500/50"
          : "bg-white border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
      }`}
  >
    {/* Header */}
    <div className="p-5 pb-3 flex justify-between items-center">
      <span
        className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
          data.metaData.Importance === "High"
            ? "bg-rose-100 text-rose-700"
            : data.metaData.Importance === "Medium"
              ? "bg-indigo-100 text-indigo-700"
              : "bg-cyan-100 text-cyan-700"
        }`}
      >
        {data.metaData.Importance}
      </span>
      <button className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <FiMoreVertical size={16} />
      </button>
    </div>

    {/* Body */}
    <div className="px-5 pb-4">
      <h3
        className={`text-[16px] font-bold leading-tight mb-2 ${darkMode ? "text-zinc-100" : "text-zinc-800"}`}
      >
        {data.name}
      </h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {data.tag.map((tag: string) => (
          <span
            key={uuidv4()}
            className="text-[10px] font-semibold text-zinc-400 uppercase tracking-tight"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-[10px] font-normal text-zinc-400 tracking-tight">
          {data.des}
        </span>
      </div>

      {/* Progress */}
      <div className="space-y-1.5 mb-4">
        <div className="flex justify-between text-[9px] font-bold text-zinc-400">
          <span>PROGRESS</span>
          <span>{data.progress}%</span>
        </div>
        <div
          className={`h-1 w-full rounded-full ${darkMode ? "bg-zinc-800" : "bg-zinc-100"}`}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${darkMode ? "bg-indigo-500" : "bg-zinc-900"}`}
            style={{ width: `${data.progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-zinc-400 text-[11px] font-bold">
          <TbSubtask size={14} className="text-indigo-500/70" />
          {data.metaData.subtaskLength}
        </div>
        <div className="flex items-center gap-1 text-zinc-400 text-[11px] font-bold">
          <FiClock size={13} className="text-indigo-500/70" />
          {data.metaData.Time}
        </div>
      </div>
    </div>

    {/* Drag Handle */}
    <div
      className={`mt-auto border-t py-3 rounded-b-lg flex justify-center items-center gap-2 cursor-grab active:cursor-grabbing transition-colors group/btn
      ${darkMode ? "border-zinc-800 hover:bg-zinc-800" : "border-zinc-50 hover:bg-zinc-50"}`}
    >
      <MdOutlineDragIndicator
        className="text-zinc-300 group-hover/btn:text-indigo-500 transition-all duration-100"
        size={16}
      />
      <span className="text-[10px] transition-all duration-100 font-bold uppercase tracking-widest text-zinc-400 group-hover/btn:text-zinc-700">
        Move Card
      </span>
    </div>
  </div>
);

export default CardUI;
