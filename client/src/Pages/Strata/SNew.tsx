import { useOutletContext } from "react-router-dom";
import { Stage } from "react-konva";
import ToolbarStrata from "../../components/ToolbarStrata";
import Grid from "./Grid";
import ElementsLayer from "./ElementsLayer"; // New component
import { useWorkspaceStore } from "./useStrataTools";
import { useState } from "react";
import type { KonvaEventObject } from "konva/lib/Node";

const SNew = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const {
    camera,
    selectedTool,
    addElement,
    updateElement,
    elements,
    setCamera,
  } = useWorkspaceStore();
  const [drawingId, setDrawingId] = useState<string | null>(null);

  const getPointer = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    if (!pointer) return { x: 0, y: 0 };
    return {
      x: (pointer.x - camera.x) / camera.zoom,
      y: (pointer.y - camera.y) / camera.zoom,
    };
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (selectedTool !== "shapes") return;
    const pos = getPointer(e);
    const newId = crypto.randomUUID();
    setDrawingId(newId);

    addElement({
      id: newId,
      type: "rect",
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
      fill: darkMode ? "#BC3F3F" : "#000000",
    });
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!drawingId) return;
    const pos = getPointer(e);
    const currentShape = elements.find((el) => el.id === drawingId);

    if (currentShape && currentShape.type === "rect") {
      updateElement(drawingId, {
        width: pos.x - currentShape.x,
        height: pos.y - currentShape.y,
      });
    }
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden ${darkMode ? "bg-zinc-950" : "bg-zinc-50"}`}
    >
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        x={camera.x}
        y={camera.y}
        scaleX={camera.zoom}
        scaleY={camera.zoom}
        draggable={selectedTool === "hand"}
        onDragEnd={(e) => setCamera({ x: e.target.x(), y: e.target.y() })}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setDrawingId(null)}
      >
        <Grid darkMode={darkMode} />
        <ElementsLayer />
      </Stage>

      <ToolbarStrata darkMode={darkMode} />
    </div>
  );
};

export default SNew;
