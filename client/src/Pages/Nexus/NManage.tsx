import type { User } from "@supabase/supabase-js";
import { IoIosArrowUp } from "react-icons/io";
import { LuBook, LuBrush, LuHouse, LuPlane, LuWorkflow } from "react-icons/lu";
import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";
import { useOutletContext } from "react-router-dom";
import { faker } from "@faker-js/faker";
import TableView from "./TableView";
import CardView from "./CardView";
import { useMemo, useState } from "react";
import { CiGrid32, CiViewColumn } from "react-icons/ci";

const NManage = () => {
  const { user, darkMode } = useOutletContext<{
    user: User;
    darkMode: boolean;
  }>();

  console.log(user.email);

  const RECOMMENDFILTER = [
    {
      title: "Home Help",
      icon: <LuHouse size={18} />,
      color: `${darkMode ? "text-yellow-200" : "text-yellow-700"}`,
    },
    {
      title: "Study",
      icon: <LuBook size={18} />,
      color: `${darkMode ? "text-blue-200" : "text-blue-700"}`,
    },
    {
      title: "Work",
      icon: <LuWorkflow size={18} />,
      color: `${darkMode ? "text-indigo-200" : "text-indigo-700"}`,
    },
    {
      title: "Drawing & Creativity",
      icon: <LuBrush size={18} />,
      color: `${darkMode ? "text-green-200" : "text-green-700"}`,
    },
    {
      title: "Plan a Trip",
      icon: <LuPlane size={18} />,
      color: `${darkMode ? "text-orange-200" : "text-orange-700"}`,
    },
    {
      title: "Priority - Low",
      icon: <RxDoubleArrowDown size={18} />,
      color: `${darkMode ? "text-green-200" : "text-green-700"}`,
    },
    {
      title: "Priority - Medium",
      icon: <IoIosArrowUp size={18} />,
      color: `${darkMode ? "text-yellow-200" : "text-yellow-700"}`,
    },
    {
      title: "Priority - High",
      icon: <RxDoubleArrowUp size={18} />,
      color: `${darkMode ? "text-red-200" : "text-red-700"}`,
    },
  ];

  const FINALDATA = useMemo(() => {
    const createMockItem = () => ({
      name: faker.company.catchPhrase(),
      des: faker.lorem.paragraph({ min: 2, max: 10 }),
      tag: [faker.commerce.department(), faker.commerce.product()],
      metaData: {
        subtaskLength: faker.number.int({ min: 5, max: 40 }),
        subtask: Array.from(
          { length: faker.number.int({ min: 1, max: 15 }) },
          () => faker.lorem.words(3),
        ),
        currentStatus: faker.helpers.arrayElement([
          "Not Started",
          "In Progress",
          "Done",
        ]),
        Importance: faker.helpers.arrayElement(["High", "Medium", "Low"]),
        Time: `${faker.number.int({ min: 1, max: 30 })} days`,
        Assignee: Array.from(
          { length: faker.number.int({ min: 1, max: 10 }) },
          () => faker.person.firstName(),
        ),
        AssigneeNumber: faker.number.int({ min: 1, max: 10 }),
      },
      progress: faker.number.int({ min: 0, max: 100 }),
    });

    return Array.from(
      { length: faker.number.int({ min: 1, max: 15 }) },
      createMockItem,
    );
  }, []);

  const [view, setView] = useState<number>(1);

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300`}
    >
      <div className={`p-2 ${darkMode ? "bg-zinc-900/20" : "bg-zinc-100/20"}`}>
        <div
          className={`flex flex-col gap-6 p-6 pt-4 ${darkMode ? "bg-zinc-950/30" : "bg-white/80"}  shadow-md rounded-lg`}
        >
          <span className={`text-lg font-medium`}>Recommended Categories</span>

          <div className="flex flex-wrap gap-4">
            {RECOMMENDFILTER.map((filter, idx) => (
              <div
                key={idx}
                className={`
                flex items-center gap-2 px-5 py-3 pr-25 rounded-lg border transition-all duration-300 cursor-pointer hover:border-blue-500 active:scale-95 shadow-sm border-zinc-400/50
              `}
              >
                {/* Icon Container */}
                <div
                  className={`p-2 rounded-xl flex items-center justify-center ${filter.color}`}
                >
                  {filter.icon}
                </div>

                {/* Text Label */}
                <span
                  className={`font-semibold text-sm ${darkMode ? "text-slate-100" : "text-slate-700"}`}
                >
                  {filter.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`p-2 mx-2 mt-4 ${darkMode ? "bg-zinc-950/30" : "bg-zinc-200/30"}`}
      >
        <div
          className={`relative left-2 flex items-center p-1.5 py-2 rounded-lg my-4 w-fit shadow-inner border transition-colors duration-300 ${darkMode ? "bg-zinc-950/40 border-zinc-700" : "bg-zinc-50 border-zinc-600/30"}`}
        >
          {/* Sliding Background Indicator */}
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl shadow-sm transition-all duration-300 ease-in-out z-0 ${view === 2 ? "translate-x-full" : "translate-x-0"} ${darkMode ? "bg-indigo-700/40" : "bg-indigo-200/40"}`}
          />

          {/* Table View Button */}
          <button
            onClick={() => setView(1)}
            className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 ${
              view === 1
                ? darkMode
                  ? "text-white"
                  : "text-zinc-900"
                : darkMode
                  ? "text-zinc-400 hover:text-zinc-100"
                  : "text-zinc-700 hover:text-zinc-900"
            }`}
          >
            <CiViewColumn className="text-xl" />
            <span>Table-View</span>
          </button>

          {/* Card View Button */}
          <button
            onClick={() => setView(2)}
            className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 ${
              view === 2
                ? darkMode
                  ? "text-white"
                  : "text-zinc-900"
                : darkMode
                  ? "text-zinc-500 hover:text-zinc-300"
                  : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <CiGrid32 className="text-xl" />
            <span>Card-View</span>
          </button>
        </div>

        <div className="p-2">
          {view === 1 ? (
            <TableView darkMode={darkMode} DATA={FINALDATA} />
          ) : view === 2 ? (
            <CardView darkMode={darkMode} DATA={FINALDATA} />
          ) : (
            <div>An error has occured</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NManage;
