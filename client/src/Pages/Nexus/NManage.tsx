import { useOutletContext } from "react-router-dom";
import TableView from "./TableView";
import CardView, { type CardData } from "./CardView";
import { useEffect, useMemo, useState } from "react";
import { CiGrid32, CiViewColumn } from "react-icons/ci";
import TaskView from "./TaskView";
import { AnimatePresence } from "motion/react";
import Carasoul from "../../components/Carasoul";

const NManage = () => {
  const { darkMode, RECOMMENDFILTER, data, setData } = useOutletContext<{
    darkMode: boolean;
    RECOMMENDFILTER: FILTERTYPE[];
    data: CardData[];
    setData: React.Dispatch<React.SetStateAction<CardData[]>>;
  }>();

  type FILTERTYPE = {
    title: string;
    icon: React.ReactNode;
    color: string;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [view, setView] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState<CardData | null>(null);

  const [closeView, setCloseView] = useState<boolean>(false);
  useEffect(() => {
    if (selectedTask !== null) setCloseView(false);
  }, [selectedTask, setSelectedTask]);

  const options = [
    {
      name: "Table View",
      icon: <CiViewColumn className="text-xl" />,
      exec: () => setView(0),
    },
    {
      name: "Card View",
      icon: <CiGrid32 className="text-xl" />,
      exec: () => setView(1),
    },
  ];

  const [selectedSubTask, setSelectedSubTask] = useState<number>(0);

  useEffect(() => {
    if (!selectedTask || selectedSubTask === -1) return;
    const toggleSubtask = (cardIdx: string, subtaskIdx: number) => {
      const newData = [...data];
      const cards = newData.filter((c) => c.id === cardIdx);
      const card = cards[0];
      const subtask = card.metaData.subtask[subtaskIdx];

      // 1. Flip the state
      subtask.isCompleted = !subtask.isCompleted;

      // 2. Recalculate progress for this card
      const completed = card.metaData.subtask.filter(
        (s) => s.isCompleted,
      ).length;
      card.progress = Math.round(
        (completed / card.metaData.subtask.length) * 100,
      );

      // 3. Update Status
      if (card.progress === 100) card.metaData.currentStatus = "Done";
      else if (card.progress === 0) card.metaData.currentStatus = "Not Started";
      else card.metaData.currentStatus = "In Progress";

      setData(newData);
    };

    if (selectedTask) {
      toggleSubtask(selectedTask?.id, selectedSubTask);
    }
    setSelectedSubTask(-1);
  }, [selectedSubTask, selectedTask, data, setData]);

  const toggleAllSubtasks = () => {
    if (!selectedTask) return;

    setData((prevData) => {
      const newData = prevData.map((task) => {
        if (task.id !== selectedTask.id) return task;

        const allDone = task.metaData.subtask.every((st) => st.isCompleted);
        const cond = !allDone;

        const updatedSubtasks = task.metaData.subtask.map((sub) => ({
          ...sub,
          isCompleted: cond,
        }));
        const statusValue = (cond ? "Done" : "Not Started") as
          | "Done"
          | "Not Started"
          | "In Progress";

        const updatedTask = {
          ...task,
          progress: cond ? 100 : 0,
          metaData: {
            ...task.metaData,
            subtask: updatedSubtasks,
            currentStatus: statusValue, //YAY
          },
        };
        // BUG: UI CHANGES: UI of task View is not working properly
        // DONE: REFRESHED THE UI: Update the selectedTask state with the new values
        setSelectedTask(updatedTask);

        return updatedTask;
      });
      return newData;
    });
  };

  const [filters, setFilters] = useState<FILTERTYPE[]>([]);

  const DATA = useMemo(() => {
    // 1. If no filters are selected, return the live 'data' state
    if (filters.length === 0) return data;

    // 2. Filter the live 'data' state
    return data.filter((item) => {
      // Check if any card tag matches the title of an active filter button
      const matchesTag = item.tag.some((t) =>
        filters.some((f) => f.title === t),
      );

      // Check if the card's Importance matches a "Priority - X" filter button
      const matchesPriority = filters.some((f) => {
        const priorityValue = f.title.replace("Priority - ", "");
        return item.metaData.Importance === priorityValue;
      });

      return matchesTag || matchesPriority;
    });
  }, [data, filters]); // data dependency ensures it updates when subtasks/drags happen

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
            {RECOMMENDFILTER.map((filter, idx) => {
              // 1. Determine if this specific button is currently active
              const isActive = filters.some((f) => f.title === filter.title);

              return (
                <button
                  key={idx}
                  className={`
        group flex items-center justify-between p-4 rounded-xl border transition-all duration-300
        ${
          darkMode
            ? isActive
              ? "bg-zinc-800 border-blue-500 shadow-lg" // Active Dark
              : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800" // Inactive Dark
            : isActive
              ? "bg-white border-blue-500 shadow-md shadow-blue-500/10" // Active Light
              : "bg-zinc-50/50 border-zinc-100 hover:bg-white hover:border-blue-200" // Inactive Light
        }
      `}
                  onClick={() =>
                    setFilters(
                      (prev) =>
                        // 2. Use .some and .filter with a specific property check
                        prev.some((f) => f.title === filter.title)
                          ? prev.filter((f) => f.title !== filter.title) // Remove
                          : [...prev, filter], // Add
                    )
                  }
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${filter.color}`}
                    >
                      {filter.icon}
                    </div>
                    <div className="flex flex-col items-start">
                      <span
                        className={`font-bold text-sm ${darkMode ? "text-white" : "text-zinc-800"} ${isActive ? "text-blue-500" : ""}`}
                      >
                        {filter.title}
                      </span>
                      <span className="text-[10px] uppercase font-normal opacity-50">
                        Explore Items
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`p-2 mx-2 mt-4 ${darkMode ? "bg-zinc-950/30" : "bg-zinc-200/30"}`}
      >
        <Carasoul darkMode={darkMode} options={options} view={view} />
        <div className="">
          {view === 0 ? (
            <TableView
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              darkMode={darkMode}
              DATA={DATA}
            />
          ) : view === 1 ? (
            <CardView
              setSelectedTask={setSelectedTask}
              selectedTask={selectedTask}
              darkMode={darkMode}
              DATA={DATA}
            />
          ) : (
            <div>An error has occured</div>
          )}
        </div>
        <AnimatePresence>
          {!closeView && selectedTask && (
            <TaskView
              toggleSubtask={setSelectedSubTask}
              task={selectedTask}
              darkMode={darkMode}
              setSelectedTask={setSelectedTask}
              isOpen={!closeView}
              toggleComplete={toggleAllSubtasks}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NManage;
