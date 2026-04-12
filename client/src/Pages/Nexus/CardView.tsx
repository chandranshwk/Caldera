import React, { useState } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardUI from "./CardUI";
import { FiPlus } from "react-icons/fi";

export interface CardData {
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
}

interface CardViewProps {
  darkMode: boolean;
  DATA: CardData[];
}

// --- Sortable Card Wrapper ---
const SortableCard = ({
  id,
  data,
  darkMode,
  setSelectedTask,
}: {
  id: string;
  data: CardData;
  darkMode: boolean;
  selectedTask: CardData | null;
  setSelectedTask: (card: CardData) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1, // Makes the placeholder faint
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardUI
        data={data}
        darkMode={darkMode}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
};

// --- Main View ---
const CardView: React.FC<CardViewProps> = ({ darkMode, DATA }) => {
  const [items, setItems] = useState<CardData[]>(DATA);
  const [activeItem, setActiveItem] = useState<CardData | null>(null);
  const [selectedTask, setSelectedTask] = useState<CardData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const columns: {
    title: string;
    key: CardData["metaData"]["currentStatus"];
    color: string;
  }[] = [
    { title: "Not Started", key: "Not Started", color: "bg-orange-500" },
    { title: "In Progress", key: "In Progress", color: "bg-blue-500" },
    { title: "Done", key: "Done", color: "bg-emerald-500" },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const item = items.find((i) => i.name === event.active.id);
    if (item) setActiveItem(item);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.name === active.id);
        const newIndex = prev.findIndex((i) => i.name === over.id);

        const newItems = [...prev];
        const movedItem = newItems[oldIndex];
        const targetItem = newItems[newIndex];

        // Update status logic
        if (movedItem && targetItem) {
          movedItem.metaData.currentStatus = targetItem.metaData.currentStatus;
        }

        return arrayMove(newItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="p-6 overflow-x-auto h-full">
        <div className="flex gap-6 min-w-max items-start">
          {columns.map((column) => (
            <div key={column.key} className="flex flex-col w-87.5 shrink-0">
              <div className="flex items-center justify-between px-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${column.color}`} />
                  <h2
                    className={`font-bold text-sm uppercase tracking-widest ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
                  >
                    {column.title}
                    <span className="ml-2 opacity-50 font-normal">
                      (
                      {
                        items.filter(
                          (d) => d.metaData.currentStatus === column.key,
                        ).length
                      }
                      )
                    </span>
                  </h2>
                </div>
                <button
                  className={`p-1.5 rounded-lg hover:bg-zinc-500/10 transition-colors ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  <FiPlus size={18} />
                </button>
              </div>

              <SortableContext
                items={items
                  .filter((i) => i.metaData.currentStatus === column.key)
                  .map((i) => i.name)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-4 min-h-5">
                  {items
                    .filter(
                      (item) => item.metaData.currentStatus === column.key,
                    )
                    .map((item) => (
                      <SortableCard
                        selectedTask={selectedTask}
                        key={item.name}
                        id={item.name}
                        data={item}
                        darkMode={darkMode}
                        setSelectedTask={setSelectedTask}
                      />
                    ))}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </div>

      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: "0.5" } },
          }),
        }}
      >
        {activeItem ? (
          <div className="rotate-3 scale-105 pointer-events-none">
            <CardUI
              setSelectedTask={setSelectedTask}
              data={activeItem}
              darkMode={darkMode}
              isOverlay
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default CardView;
