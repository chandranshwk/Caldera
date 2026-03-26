import React from "react";
import { faker } from "@faker-js/faker";
import { FiDownload, FiShare, FiPlus } from "react-icons/fi";
import { SiGoogledocs, SiGooglesheets } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";
import { RECENT_FILES } from "../../assets/assets";
import { BiDownload } from "react-icons/bi";
import {
  HiOutlineBookOpen,
  HiOutlineDotsHorizontal,
  HiOutlineDownload,
  HiOutlineShare,
  HiOutlineTrash,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import { IoIosArrowForward } from "react-icons/io";

interface FdashboardProps {
  darkMode: boolean;
}

// 1. Centralized Data Config
const METRICS = [
  {
    id: "excel",
    icon: <SiGooglesheets />,
    name: "Sheet",
    color: "bg-emerald-500",
    des: "Create professional excel sheets.",
    link: "/forge/sheets",
  },
  {
    id: "words",
    icon: <SiGoogledocs />,
    name: "Docs",
    color: "bg-blue-600",
    des: "Create a comprehensive document for the team!",
    link: "/forge/docs",
  },
  {
    id: "pdf",
    icon: <FaFilePdf className="font-black text-white" />,
    name: "PDFs",
    color: "bg-red-600",
    des: "Create, merge, convert from or to PDFs.",
    link: "/forge/pdfs",
  },
  {
    id: "downloads",
    icon: <FiDownload />,
    name: "Downloads",
    color: "bg-amber-400",
  },
  { id: "shared", icon: <FiShare />, name: "Shared", color: "bg-purple-600" },
];

const FDashboard: React.FC<FdashboardProps> = ({ darkMode }) => {
  const textColor = darkMode ? "text-gray-100" : "text-gray-800";
  const cardBg = darkMode ? "bg-[#1a1a1c]" : "bg-white";
  const subText = darkMode ? "text-gray-400" : "text-gray-500";

  const navigate = useNavigate();

  return (
    <div
      className={`p-6 h-screen overflow-y-auto transition-colors duration-300 my-scrollbar ${darkMode ? "bg-[#0f0f1000]" : "bg-gray-50"}`}
    >
      {/* Upper Stats Grid */}
      <div className="grid md:grid-cols-5 grid-cols-2 gap-6 mb-10">
        {METRICS.map((data) => (
          <div
            key={data.id}
            className={`flex items-center p-4 rounded-xl shadow-sm border ${darkMode ? "border-gray-800" : "border-gray-100"} ${cardBg} hover:shadow-md transition-all cursor-pointer group`}
            onClick={() => navigate(data.link ?? "")}
          >
            <span
              className={`text-2xl rounded-lg ${data.color} text-white p-3 group-hover:scale-110 transition-transform`}
            >
              {data.icon}
            </span>
            <div className="ml-4 flex flex-col">
              <span
                className={`text-xs font-medium uppercase tracking-wider ${subText}`}
              >
                {data.name}
              </span>
              <span className={`text-2xl font-bold ${textColor}`}>
                {faker.number.int({ min: 10, max: 99 })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Creation Shortcuts */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-xl font-bold flex items-center gap-2 ${textColor}`}
          >
            <FiPlus className="text-blue-500" /> Quick Create
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {METRICS.slice(0, 3).map((data) => (
            <div
              key={`create-${data.id}`}
              className={`flex items-start p-6 rounded-lg border-2 border-transparent ${cardBg} shadow-sm hover:border-l-blue-500/50 hover:border-l-4 hover:bg-blue-500/5 transition-all cursor-pointer group relative overflow-hidden`}
            >
              <span
                className={`text-3xl rounded-xl ${data.color} text-white p-4 shadow-lg`}
              >
                {data.icon}
              </span>
              <div className="ml-5 pr-8">
                <h3 className={`text-lg font-bold ${textColor}`}>
                  {data.name}
                </h3>
                <p
                  className={`text-sm w-[75%] text-wrap mt-1 leading-relaxed ${subText}`}
                >
                  {data.des}
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <FiPlus className={textColor} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section (The "Missing" Piece) */}
      <div
        className={`${cardBg} rounded-2xl shadow-sm border  ${darkMode ? "border-gray-800" : "border-gray-100"} p-6`}
      >
        <h2 className={`text-lg font-bold mb-4 ${textColor}`}>Recent Files</h2>
        <div className="space-y-4  mx-auto p-4 grid grid-cols-2 gap-4 gap-x-7">
          {RECENT_FILES.slice(0, 6).map((file) => (
            <div
              key={file.id}
              className={`group relative z-0 flex items-center gap-4 p-4 rounded-2xl transition-all shadow-sm duration-300 ${darkMode ? "bg-[#18181b] border-white/5 hover:bg-gray-800/60 shadow-xl" : "bg-white border-gray-100 hover:bg-gray-50 shadow-sm"}border hover:-translate-y-0.5 cursor-pointer`}
              onClick={() => {}}
            >
              {/* File Icon with Glass Effect */}
              <div
                className={`
          relative w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110
          ${
            file.type === "excel"
              ? "bg-emerald-500/10 text-emerald-500"
              : file.type === "pdf"
                ? "bg-red-500/10 text-red-500"
                : "bg-blue-500/10 text-blue-500"
          }
        `}
              >
                {file.type === "excel" ? (
                  <SiGooglesheets />
                ) : file.type === "pdf" ? (
                  <FaFilePdf className="font-black" />
                ) : (
                  <SiGoogledocs />
                )}
                {/* Subtle inner glow for the icon */}
                <div className="absolute inset-0 rounded-xl blur-lg opacity-20 bg-current" />
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3
                    className={`text-[15px] font-semibold leading-none truncate ${textColor}`}
                  >
                    {file.name}
                  </h3>
                  <span
                    className={`
            text-[9px] px-1.5 py-0.5 rounded-md uppercase font-black tracking-widest
            ${
              file.type === "excel"
                ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-400"
                : "bg-blue-500/10 text-blue-800 dark:text-blue-400"
            }
          `}
                  >
                    {file.type}
                  </span>
                </div>

                <p
                  className={`text-xs ${subText} opacity-70 w-[85%] line-clamp-2 text-wrap mb-2 font-medium`}
                >
                  {file.des}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${file.type === "excel" ? "bg-emerald-500" : "bg-blue-500"} opacity-40`}
                    />
                    <span
                      className={`text-[11px] font-medium ${subText} opacity-60`}
                    >
                      {file.editedAt}
                    </span>
                  </div>
                  <span className="text-[10px] opacity-20 font-bold text-gray-500">
                    •
                  </span>
                  <span
                    className={`text-[11px] font-medium ${subText} opacity-60`}
                  >
                    {file.size}
                  </span>
                </div>
              </div>

              {/* Action Button - Hidden until hover for a cleaner look */}
              <div className="shadow-md h-max w-max p-1 rounded-full group-hover:translate-x-1 transition-all duration-150">
                <IoIosArrowForward size={15} />
              </div>

              {/* Modern Gradient Border (Dark Mode Only) */}
              {darkMode && (
                <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none group-hover:border-white/10 transition-colors" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className={`${cardBg} rounded-[2.5rem] mt-6 border ${
          darkMode
            ? "border-white/5 bg-[#1c1c1e]/80"
            : "border-black/5 bg-[#f5f5f7]/50"
        } shadow-md overflow-hidden backdrop-blur-xl`} // Cleaned link string
      >
        <div className="overflow-x-auto px-4 py-2">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400/80">
                <th className="px-6 py-4">File</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-center">Shared</th>
                <th className="px-6 py-4 text-center">Downloads</th>
                <th className="px-6 py-4">Modified</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {RECENT_FILES.map((file, idx) => (
                <tr
                  key={idx}
                  className={`group transition-all duration-300 ease-out relative hover:z-10
              ${darkMode ? "hover:bg-white/3" : "hover:bg-white"} 
              hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-0.5
              ${idx % 2 === 0 ? "bg-transparent" : darkMode ? "bg-white/1" : "bg-black/3"}`}
                >
                  {/* File Column */}
                  <td className="px-6 py-4 first:rounded-l-2xl">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-inner
                  ${
                    file.type === "excel"
                      ? "text-emerald-500 bg-emerald-500/10"
                      : file.type === "pdf"
                        ? "text-rose-500 bg-rose-500/10"
                        : "text-blue-500 bg-blue-500/10"
                  }`}
                      >
                        {file.type === "excel" ? (
                          <SiGooglesheets />
                        ) : file.type === "pdf" ? (
                          <FaFilePdf />
                        ) : (
                          <SiGoogledocs />
                        )}
                      </div>
                      <div>
                        <div
                          className={`text-sm font-semibold tracking-tight ${darkMode ? "text-neutral-100" : "text-neutral-800"}`}
                        >
                          {file.name}
                        </div>
                        <span className="text-[9px] font-black tracking-widest uppercase opacity-40 leading-none">
                          {file.extension.replace(".", "")}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Description - Simplified for clean truncation */}
                  <td
                    className={`px-6 py-4 text-sm font-light ${darkMode ? "text-neutral-400" : "text-neutral-500"} max-w-96 truncate`}
                  >
                    {file.des}
                  </td>

                  {/* Stats */}
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-[12px] font-medium">
                      {file.sharedCount}{" "}
                      <HiOutlineShare className="opacity-50" />
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-[12px] font-medium">
                      {file.downloadCount} <BiDownload className="opacity-50" />
                    </div>
                  </td>

                  <td className="px-6 py-4 text-[12px] text-neutral-400 font-medium">
                    {file.editedAt}
                  </td>

                  {/* Action Button */}
                  <td className="px-6 py-4 text-right last:rounded-r-2xl">
                    <Dropdown
                      darkMode={darkMode}
                      width="w-52"
                      trigger={
                        <button
                          className={`group-hover:bg-neutral-100 group-hover:text-black p-2.5 rounded-xl text-neutral-400 ${darkMode ? "hover:text-white" : "hover:text-black"} transition-colors duration-200`}
                        >
                          <HiOutlineDotsHorizontal size={18} />
                        </button>
                      }
                      items={[
                        {
                          label: "Open File",
                          icon: <HiOutlineBookOpen />,
                          onClick: () => {},
                        },
                        {
                          label: "Download File",
                          icon: <HiOutlineShare />,
                          onClick: () => {},
                        },
                        {
                          label: "Download File",
                          icon: <HiOutlineDownload />,
                          onClick: () => {},
                        },
                        {
                          label: "Delete Forever",
                          variant: "destructive",
                          separator: true,
                          icon: <HiOutlineTrash />,
                          onClick: () => {},
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FDashboard;
