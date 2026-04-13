import React, { useEffect, useState } from "react";
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

export interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

export interface CardData {
  id: string;
  name: string;
  des: string;
  tag: string[];
  metaData: {
    subtaskLength: number;
    subtask: {
      name: string;
      isCompleted: boolean;
    }[];
    currentStatus: "Not Started" | "In Progress" | "Done";
    Importance: "High" | "Medium" | "Low";
    Time: string;
    Assignee: Assignee[];
  };
  progress: number;
}

interface CardViewProps {
  darkMode: boolean;
  DATA: CardData[];
  selectedTask: CardData | null;
  setSelectedTask: (card: CardData) => void;
}

interface DroppableColumnProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

import { useDroppable } from "@dnd-kit/core";

const DroppableColumn = ({ id, children, className }: DroppableColumnProps) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
};

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
const CardView: React.FC<CardViewProps> = ({
  darkMode,
  DATA,
  selectedTask,
  setSelectedTask,
}) => {
  const [items, setItems] = useState<CardData[]>(DATA);
  const [activeItem, setActiveItem] = useState<CardData | null>(null);

  useEffect(() => {
    setItems(DATA);
  }, [DATA]);

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

    const activeId = active.id as string;
    const overId = over.id as string;

    setItems((prev) => {
      const oldIndex = prev.findIndex((i) => i.name === activeId);
      if (oldIndex === -1) return prev;

      const movedItem = { ...prev[oldIndex] };

      // 1. Check if dropped over a COLUMN (empty column drop zone)
      const isOverAColumn = columns.some((col) => col.key === overId);

      if (isOverAColumn) {
        movedItem.metaData.currentStatus =
          overId as CardData["metaData"]["currentStatus"];
        const filteredItems = prev.filter((i) => i.name !== activeId);
        return [...filteredItems, movedItem];
      }

      // 2. Check if dropped over another CARD
      const newIndex = prev.findIndex((i) => i.name === overId);
      if (oldIndex !== newIndex && newIndex !== -1) {
        const targetItem = prev[newIndex];

        // Update status to match the column we dropped into
        movedItem.metaData.currentStatus = targetItem.metaData.currentStatus;

        // Create new array, update the moved item's status, then move it
        const tempItems = [...prev];
        tempItems[oldIndex] = movedItem;

        return arrayMove(tempItems, oldIndex, newIndex);
      }

      return prev;
    });
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
                {/* Wrap the list container in DroppableColumn */}
                <DroppableColumn
                  id={column.key}
                  className="flex flex-col gap-4 min-h-37.5"
                >
                  {items.filter(
                    (item) => item.metaData.currentStatus === column.key,
                  ).length > 0 ? (
                    items
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
                      ))
                  ) : (
                    <div
                      className={`h-24 border-2 border-dashed rounded-xl flex items-center justify-center 
        ${darkMode ? "border-zinc-800 text-zinc-600" : "border-zinc-200 text-zinc-400"}`}
                    >
                      <span className="text-xs font-medium uppercase tracking-tighter">
                        No tasks
                      </span>
                    </div>
                  )}
                </DroppableColumn>
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
