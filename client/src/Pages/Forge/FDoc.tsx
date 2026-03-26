import {
  HiOutlineBookOpen,
  HiOutlineDotsHorizontal,
  HiOutlineDownload,
  HiOutlineShare,
  HiOutlineTrash,
} from "react-icons/hi";
import Dropdown from "../../components/Dropdown";
import { BiDownload } from "react-icons/bi";
import { SiGoogledocs, SiGooglesheets } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";
import { RECENT_FILES } from "../../assets/assets";

interface FDoc {
  darkMode: boolean;
}

const FDoc: React.FC<FDoc> = ({ darkMode }) => {
  const cardBg = darkMode ? "bg-[#1a1a1c]" : "bg-white";
  return (
    <div
      className={`p-6 h-screen overflow-y-auto transition-colors duration-300 my-scrollbar ${darkMode ? "bg-[#0f0f1000]" : ""}`}
    >
      {" "}
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
              {RECENT_FILES.filter((files) => files.type === "words").map(
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
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FDoc;
