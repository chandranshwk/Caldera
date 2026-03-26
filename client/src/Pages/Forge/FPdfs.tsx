import React from "react";
import {
  HiOutlineDocumentText,
  HiOutlineDuplicate,
  HiOutlineBookOpen,
  HiOutlineShare,
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlineDotsHorizontal,
  HiOutlineLockClosed,
  HiOutlinePlus,
  HiOutlineRefresh,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import Dropdown from "../../components/Dropdown";
import { BiDownload } from "react-icons/bi";
import { FaFilePdf } from "react-icons/fa";
import { RECENT_FILES } from "../../assets/assets";
import { SiGoogledocs, SiGooglesheets } from "react-icons/si";

interface FPdfsProps {
  darkMode: boolean;
}

const FPdfs: React.FC<FPdfsProps> = ({ darkMode }) => {
  const cardBg = darkMode ? "bg-[#1a1a1c]" : "bg-white";

  return (
    <div
      className={`p-8 h-screen overflow-y-auto transition-colors duration-500 my-scrollbar ${darkMode ? "bg-[#0f0f10]/40 text-white" : "bg-[#fbfbfd] text-black"}`}
    >
      {/* --- FANCY PDF ACTION HEADER --- */}
      <header className="mb-12">
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-4xl font-light tracking-tight">PDF Suite</h1>
          <p className="text-neutral-500 text-sm font-medium">
            Professional tools for document conversion and security
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Create PDF (Re-imagined as Asset Assembler) */}
          <div
            className={`group relative p-6 rounded-[2.2rem] border transition-all duration-500 cursor-pointer overflow-hidden
  ${darkMode ? "bg-[#1c1c1e] border-white/5 hover:border-blue-500/50" : "bg-white border-black/5 hover:border-blue-500/30"}
  hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)] hover:-translate-y-1.5`}
          >
            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <HiOutlinePlus />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight leading-none">
                  Create PDF
                </h3>
                {/* Changed sub-label to be more "Pro" */}
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.15em] font-black mt-2">
                  From Images / Scan
                </p>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />
          </div>

          {/* 2. Merge PDF (Rose - Standard PDF Red) */}
          <div
            className={`group relative p-6 rounded-[2.2rem] border transition-all duration-500 cursor-pointer overflow-hidden
      ${darkMode ? "bg-[#1c1c1e] border-white/5 hover:border-rose-500/50" : "bg-white border-black/5 hover:border-rose-500/30"}
      hover:shadow-[0_20px_40px_rgba(244,63,94,0.12)] hover:-translate-y-1.5`}
          >
            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
                <HiOutlineDuplicate />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight leading-none">
                  Merge PDFs
                </h3>
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.15em] font-black mt-2">
                  Combine Files
                </p>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-rose-500/10 blur-3xl group-hover:bg-rose-500/20 transition-all duration-500" />
          </div>

          {/* 3. Word to PDF (Emerald - Productivity Green) */}
          <div
            className={`group relative p-6 rounded-[2.2rem] border transition-all duration-500 cursor-pointer overflow-hidden
      ${darkMode ? "bg-[#1c1c1e] border-white/5 hover:border-emerald-500/50" : "bg-white border-black/5 hover:border-emerald-500/30"}
      hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)] hover:-translate-y-1.5`}
          >
            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110">
                <HiOutlineDocumentText />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight leading-none">
                  Docx to PDF
                </h3>
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.15em] font-black mt-2">
                  Convert From
                </p>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />
          </div>

          {/* 4. PDF to Word (Amber - Transition/Conversion Orange) */}
          <div
            className={`group relative p-6 rounded-[2.2rem] border transition-all duration-500 cursor-pointer overflow-hidden
      ${darkMode ? "bg-[#1c1c1e] border-white/5 hover:border-amber-500/50" : "bg-white border-black/5 hover:border-amber-500/30"}
      hover:shadow-[0_20px_40px_rgba(245,158,11,0.12)] hover:-translate-y-1.5`}
          >
            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110">
                <HiOutlineRefresh />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight leading-none">
                  PDF to Docx
                </h3>
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.15em] font-black mt-2">
                  Convert To
                </p>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/10 blur-3xl group-hover:bg-amber-500/20 transition-all duration-500" />
          </div>

          {/* 5. Compress PDF (Purple - SystemPurple) */}
          <div
            className={`group relative p-6 rounded-[2.2rem] border transition-all duration-500 cursor-pointer overflow-hidden
      ${darkMode ? "bg-[#1c1c1e] border-white/5 hover:border-purple-500/50" : "bg-white border-black/5 hover:border-purple-500/30"}
      hover:shadow-[0_20px_40px_rgba(168,85,247,0.12)] hover:-translate-y-1.5`}
          >
            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110">
                <HiOutlineLightningBolt />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight leading-none">
                  Compress
                </h3>
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.15em] font-black mt-2">
                  Reduce Size
                </p>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />
          </div>

          {/* 6. Protect PDF (Indigo - Security Indigo) */}
          <div
            className={`group relative p-6 rounded-[2.2rem] border transition-all duration-500 cursor-pointer overflow-hidden
      ${darkMode ? "bg-[#1c1c1e] border-white/5 hover:border-indigo-500/50" : "bg-white border-black/5 hover:border-indigo-500/30"}
      hover:shadow-[0_20px_40px_rgba(99,102,241,0.12)] hover:-translate-y-1.5`}
          >
            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110">
                <HiOutlineLockClosed />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight leading-none">
                  Protect
                </h3>
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.15em] font-black mt-2">
                  Add Password
                </p>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500" />
          </div>
        </div>
      </header>

      {/* --- PDF TABLE --- */}

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
              {RECENT_FILES.filter((files) => files.type === "pdf").map(
                (file, idx) => (
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
                        {file.downloadCount}{" "}
                        <BiDownload className="opacity-50" />
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
                            className={`group-hover:bg-neutral-100 group-hover:text-black p-2.5 rounded-xl text-neutral-400 ${darkMode ? "hover:text-black" : "hover:text-black"} transition-colors duration-200`}
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
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FPdfs;
