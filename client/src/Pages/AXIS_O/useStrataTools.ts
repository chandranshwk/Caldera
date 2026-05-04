import { create } from "zustand";
import { temporal } from "zundo";

export interface Point {
  x: number;
  y: number;
}

export type WorkspaceElement =
  | {
      id: string;
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      fill: string;
    }
  | {
      id: string;
      type: "circle";
      x: number;
      y: number;
      radius: number;
      fill: string;
    }
  | {
      id: string;
      type: "triangle";
      x: number;
      y: number;
      radius: number;
      fill: string;
    }
  | {
      id: string;
      type: "line";
      points: number[];
      stroke: string;
      strokeWidth: number;
      tool: string;
    }
  | { id: string; type: "node"; x: number; y: number; label: string };

interface WorkspaceState {
  selectedTool: string;
  camera: { x: number; y: number; zoom: number };
  elements: WorkspaceElement[];
  selectedElementId: string | null; // Added this
  setTool: (id: string) => void;
  setCamera: (updates: Partial<{ x: number; y: number; zoom: number }>) => void;
  zoomToPoint: (pointer: Point, deltaY: number) => void;
  setSelectedElementId: (id: string | null) => void; // Added this
  addElement: (el: WorkspaceElement) => void;
  updateElement: (id: string, updates: Partial<WorkspaceElement>) => void;
  deleteElement: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  temporal(
    (set) => ({
      selectedTool: "select",
      camera: { x: 0, y: 0, zoom: 1 },
      elements: [],
      selectedElementId: null,

      setTool: (id) => set({ selectedTool: id, selectedElementId: null }),

      setCamera: (updates) =>
        set((s) => ({ camera: { ...s.camera, ...updates } })),

      setSelectedElementId: (id) => set({ selectedElementId: id }),

      zoomToPoint: (pointer, deltaY) =>
        set((s) => {
          const scaleBy = 1.1;
          const oldScale = s.camera.zoom;
          let newScale = deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
          newScale = Math.max(0.05, Math.min(newScale, 20));

          const mousePointTo = {
            x: (pointer.x - s.camera.x) / oldScale,
            y: (pointer.y - s.camera.y) / oldScale,
          };

          return {
            camera: {
              zoom: newScale,
              x: pointer.x - mousePointTo.x * newScale,
              y: pointer.y - mousePointTo.y * newScale,
            },
          };
        }),

      addElement: (el) => set((s) => ({ elements: [...s.elements, el] })),

      updateElement: (id, updates) =>
        set((s) => ({
          elements: s.elements.map((el) =>
            el.id === id ? ({ ...el, ...updates } as WorkspaceElement) : el,
          ),
        })),

      deleteElement: (id) =>
        set((s) => ({
          elements: s.elements.filter((el) => el.id !== id),
          selectedElementId:
            s.selectedElementId === id ? null : s.selectedElementId,
        })),
    }),
    {
      partialize: (state) => ({ elements: state.elements }),
    },
  ),
);
