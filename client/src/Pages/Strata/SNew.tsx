import { useOutletContext } from "react-router-dom";
import { Stage, Layer, Rect, Circle, RegularPolygon } from "react-konva";
import { useRef, useState, useCallback, useEffect } from "react";
import Konva from "konva";
import ToolbarStrata from "../../components/ToolbarStrata";
import Grid from "./Grid";
import { useWorkspaceStore, type WorkspaceElement } from "./useStrataTools";
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
    // Pull selection state from your store
    selectedElementId,
    setSelectedElementId,
  } = useWorkspaceStore();

  const [drawingId, setDrawingId] = useState<string | null>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [shape, setShape] = useState("rect");

  const getPointer = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      const stage = e.target.getStage();
      if (!stage) return { x: 0, y: 0 };
      const pointer = stage.getPointerPosition();
      if (!pointer) return { x: 0, y: 0 };

      return {
        x: (pointer.x - stage.x()) / stage.scaleX(),
        y: (pointer.y - stage.y()) / stage.scaleY(),
      };
    },
    [],
  );

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition() || { x: 0, y: 0 };
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * 1.1 : oldScale / 1.1;

    stage.scale({ x: newScale, y: newScale });
    stage.position({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });

    setCamera({ zoom: newScale, x: stage.x(), y: stage.y() });
  };

  const handleMouseDown = (
    e: KonvaEventObject<MouseEvent>,
    shapeType: string,
  ) => {
    // 1. Deselect if clicking empty space in Select mode
    if (selectedTool === "select") {
      if (e.target === e.target.getStage()) {
        setSelectedElementId(null);
      }
      return;
    }

    if (selectedTool !== "shapes") return;

    const pos = getPointer(e);
    const newId = crypto.randomUUID();
    setDrawingId(newId);

    const baseProps = {
      id: newId,
      x: pos.x,
      y: pos.y,
      fill: darkMode ? "#BC3F3F" : "#000000",
    };

    let newElement: WorkspaceElement;
    if (shapeType === "rect") {
      newElement = { ...baseProps, type: "rect", width: 0, height: 0 };
    } else if (shapeType === "circle") {
      newElement = { ...baseProps, type: "circle", radius: 0 };
    } else {
      newElement = { ...baseProps, type: "triangle", radius: 0 };
    }

    addElement(newElement);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!drawingId) return;

    const pos = getPointer(e);
    const element = elements.find((el) => el.id === drawingId);
    if (!element) return;

    if (element.type === "rect") {
      updateElement(drawingId, {
        width: pos.x - element.x,
        height: pos.y - element.y,
      });
    } else if (element.type === "circle" || element.type === "triangle") {
      const dx = pos.x - element.x;
      const dy = pos.y - element.y;
      const radius = Math.sqrt(dx * dx + dy * dy);
      updateElement(drawingId, { radius });
    }
  };

  const handleMouseUp = () => setDrawingId(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        if (e.shiftKey) useWorkspaceStore.temporal.getState().redo();
        else useWorkspaceStore.temporal.getState().undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        useWorkspaceStore.temporal.getState().redo();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const container = stage.container();

    // Modern SVG Data URLs (scaled to 24px)
    const grabSVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0'/%3E%3Cpath d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0'/%3E%3Cpath d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0'/%3E%3Cpath d='M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'/%3E%3C/svg%3E") 12 12, auto`;

    const grabbingSVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 9.5V4a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v10'/%3E%3Cpath d='M14 13V6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v7'/%3E%3Cpath d='M18 13V8a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v10'/%3E%3Cpath d='M22 18a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'/%3E%3Cpath d='M6 14V8a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v6'/%3E%3C/svg%3E") 12 12, auto`;

    const cursors: Record<string, string> = {
      select: "default",
      hand: grabSVG, // High-quality hand
      shapes: "crosshair",
      draw: "crosshair",
    };

    container.style.cursor = cursors[selectedTool] || "default";

    // Dynamic feedback for the Hand tool
    const handleMouseDown = () => {
      if (selectedTool === "hand") container.style.cursor = grabbingSVG;
    };
    const handleMouseUp = () => {
      if (selectedTool === "hand") container.style.cursor = grabSVG;
    };

    stage.on("mousedown", handleMouseDown);
    stage.on("mouseup", handleMouseUp);

    return () => {
      stage.off("mousedown", handleMouseDown);
      stage.off("mouseup", handleMouseUp);
    };
  }, [selectedTool]);

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden ${darkMode ? "bg-zinc-950" : "bg-zinc-50"}`}
    >
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        x={camera.x}
        y={camera.y}
        scaleX={camera.zoom}
        scaleY={camera.zoom}
        onWheel={handleWheel}
        draggable={selectedTool === "hand"}
        onDragEnd={(e) => setCamera({ x: e.target.x(), y: e.target.y() })}
        onMouseDown={(e) => handleMouseDown(e, shape)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Grid darkMode={darkMode} />
        <Layer>
          {elements.map((el) => {
            const isSelected = selectedElementId === el.id;
            const isSelectMode = selectedTool === "select";

            const commonProps = {
              key: el.id,
              draggable: isSelectMode,
              // Add smooth shadows instead of just a stroke
              shadowColor: "black",
              shadowBlur: isSelected ? 15 : 0,
              shadowOpacity: isSelected ? 0.3 : 0,
              shadowOffset: isSelected ? { x: 5, y: 5 } : { x: 0, y: 0 },

              // Smooth stroke
              stroke: isSelected ? "#3b82f6" : undefined,
              strokeWidth: isSelected ? 2 : 0,

              // Animation via Konva (this is the key to smoothness)
              onMouseEnter: (e: KonvaEventObject<MouseEvent>) => {
                const container = e.target.getStage()?.container();
                if (container)
                  container.style.cursor = isSelectMode ? "move" : "default";
                // Scale up slightly on hover
                e.target.to({
                  scaleX: 1.01,
                  scaleY: 1.01,
                  duration: 0.2,
                });
              },
              onMouseLeave: (e: KonvaEventObject<MouseEvent>) => {
                const container = e.target.getStage()?.container();
                if (container) container.style.cursor = "default";
                // Scale back down
                e.target.to({
                  scaleX: 1,
                  scaleY: 1,
                  duration: 0.2,
                });
              },

              onClick: (e: KonvaEventObject<MouseEvent>) => {
                if (!isSelectMode) return;
                e.cancelBubble = true;
                setSelectedElementId(el.id);
              },

              onDragStart: (e: KonvaEventObject<DragEvent>) => {
                e.cancelBubble = true;
                // Lift the object up visually when dragging
                e.target.setAttrs({
                  shadowBlur: 20,
                  shadowOpacity: 0.4,
                  scaleX: 1.01,
                  scaleY: 1.01,
                });
              },

              onDragEnd: (e: KonvaEventObject<DragEvent>) => {
                e.cancelBubble = true;
                // Drop the object back down
                e.target.to({
                  shadowBlur: isSelected ? 15 : 0,
                  shadowOpacity: isSelected ? 0.3 : 0,
                  scaleX: 1,
                  scaleY: 1,
                  duration: 0.2,
                });
                updateElement(el.id, { x: e.target.x(), y: e.target.y() });
              },
            };

            // Narrowing handles the x, y, width, height, and radius requirements
            if (el.type === "rect") {
              return (
                <Rect
                  {...commonProps}
                  x={el.x}
                  y={el.y}
                  width={el.width}
                  height={el.height}
                  fill={el.fill}
                />
              );
            }

            if (el.type === "circle") {
              return (
                <Circle
                  {...commonProps}
                  x={el.x}
                  y={el.y}
                  radius={el.radius}
                  fill={el.fill}
                />
              );
            }

            if (el.type === "triangle") {
              return (
                <RegularPolygon
                  {...commonProps}
                  x={el.x}
                  y={el.y}
                  sides={3}
                  radius={el.radius}
                  fill={el.fill}
                />
              );
            }

            // Handle line separately if needed
            return null;
          })}
        </Layer>
      </Stage>
      <ToolbarStrata darkMode={darkMode} setShape={setShape} />
    </div>
  );
};

export default SNew;
