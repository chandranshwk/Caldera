import { IoIosArrowUp } from "react-icons/io";
import { LuBook, LuBrush, LuHouse, LuPlane, LuWorkflow } from "react-icons/lu";
import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";
import { useOutletContext } from "react-router-dom";
import { faker } from "@faker-js/faker";
import TableView from "./TableView";
import CardView, { type CardData } from "./CardView";
import { useEffect, useMemo, useState } from "react";
import { CiGrid32, CiViewColumn } from "react-icons/ci";
import TaskView from "./TaskView";
import { AnimatePresence } from "motion/react";

const NManage = () => {
  const { darkMode } = useOutletContext<{
    darkMode: boolean;
  }>();

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
    const createMockItem = () => {
      const subtaskCount = faker.number.int({ min: 5, max: 20 });

      // Create actual user objects for assignees
      const assignees = Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => {
          const firstName = faker.person.firstName();
          const lastName = faker.person.lastName();
          const fullName = `${firstName} ${lastName}`;
          const id = faker.string.uuid();

          return {
            id,
            name: fullName,
            // Option A: Real faces using pravatar (Very stable)
            avatar: faker.image.avatar(),

            // Option B: Letter-based avatars if you prefer (Never fails)
            // avatar: `https://ui-avatars.com{firstName}+${lastName}&background=random`,

            initials: `${firstName.charAt(0)}${lastName.charAt(0)}`,
          };
        },
      );

      return {
        name: faker.company.catchPhrase(),
        des: faker.lorem.paragraph({ min: 2, max: 10 }),
        tag: [faker.commerce.department(), faker.commerce.product()],
        metaData: {
          subtaskLength: subtaskCount,
          subtask: Array.from({ length: subtaskCount }, () =>
            faker.lorem.words(3),
          ),
          currentStatus: faker.helpers.arrayElement([
            "Not Started",
            "In Progress",
            "Done",
          ]),
          Importance: faker.helpers.arrayElement(["High", "Medium", "Low"]),
          Time: `${faker.number.int({ min: 1, max: 30 })} days`,
          Assignee: assignees, // Now an array of objects
          AssigneeNumber: assignees.length,
        },
        progress: faker.number.int({ min: 0, max: 100 }),
      };
    };

    return Array.from({ length: 12 }, createMockItem);
  }, []);

  const [view, setView] = useState<number>(1);
  const [selectedTask, setSelectedTask] = useState<CardData | null>(null);

  const [closeView, setCloseView] = useState<boolean>(false);
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (selectedTask !== null) setCloseView(false);
  }, [selectedTask, setSelectedTask]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300`}
    >
      <div className={`p-2`}>
        <div
          className={`p-8 rounded-lg  ${
            darkMode
              ? "bg-zinc-950/30  shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              : "bg-white  shadow-sm"
          }`}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <h3
              className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}
            >
              Recommended Categories
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {RECOMMENDFILTER.map((filter, idx) => (
              <button
                key={idx}
                className={`
            group flex items-center justify-between p-4 rounded-xl border transition-all duration-300
            ${
              darkMode
                ? "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700"
                : "bg-zinc-50/50 border-zinc-100 hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5"
            }
          `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
              w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 
              ${filter.color}
            `}
                  >
                    {/* Ensure your icons have a size like size={20} */}
                    {filter.icon}
                  </div>

                  <div className="flex flex-col items-start">
                    <span
                      className={`font-bold text-sm ${darkMode ? "text-white" : "text-zinc-800"}`}
                    >
                      {filter.title}
                    </span>
                    <span className="text-[10px] uppercase font-normal  opacity-50">
                      Explore Items
                    </span>
                  </div>
                </div>

                <div
                  className={`
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 
            ${darkMode ? "text-zinc-600" : "text-zinc-300"}
          `}
                >
                  {/* Small Arrow Icon here if available, e.g. <FiChevronRight /> */}
                </div>
              </button>
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
            <TableView
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              darkMode={darkMode}
              DATA={FINALDATA}
            />
          ) : view === 2 ? (
            <CardView
              setSelectedTask={setSelectedTask}
              selectedTask={selectedTask}
              darkMode={darkMode}
              DATA={FINALDATA}
            />
          ) : (
            <div>An error has occured</div>
          )}
        </div>
        <AnimatePresence>
          {!closeView && selectedTask && (
            <TaskView
              task={selectedTask}
              darkMode={darkMode}
              setSelectedTask={setSelectedTask}
              isOpen={!closeView} // Pass the boolean directly
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NManage;
