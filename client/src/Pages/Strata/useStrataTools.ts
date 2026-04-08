import { create } from "zustand";

export interface Point {
  x: number;
  y: number;
}

// 1. Define all possible elements in your intricate workspace
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
      type: "line";
      points: number[];
      stroke: string;
      strokeWidth: number;
      tool: string;
    }
  | { id: string; type: "node"; x: number; y: number; label: string };

// 2. Define the Store's Interface
interface WorkspaceState {
  selectedTool: string;
  camera: { x: number; y: number; zoom: number };
  elements: WorkspaceElement[];
  setTool: (id: string) => void;
  setCamera: (updates: Partial<{ x: number; y: number; zoom: number }>) => void;
  zoomToPoint: (pointer: Point, deltaY: number) => void;
  addElement: (el: WorkspaceElement) => void;
  updateElement: (id: string, updates: Partial<WorkspaceElement>) => void;
  deleteElement: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  // --- STATE ---
  selectedTool: "select",
  camera: { x: 0, y: 0, zoom: 1 },
  elements: [],

  // --- ACTIONS ---
  setTool: (id) => set({ selectedTool: id }),

  setCamera: (updates) => set((s) => ({ camera: { ...s.camera, ...updates } })),

  zoomToPoint: (pointer, deltaY) =>
    set((s) => {
      const scaleBy = 1.1;
      const oldScale = s.camera.zoom;
      const newScale = deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

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

  addElement: (el) =>
    set((s) => ({
      elements: [...s.elements, el],
    })),

  updateElement: (id, updates) =>
    set((s) => ({
      elements: s.elements.map((el) =>
        el.id === id ? ({ ...el, ...updates } as WorkspaceElement) : el,
      ),
    })),

  deleteElement: (id) =>
    set((s) => ({
      elements: s.elements.filter((el) => el.id !== id),
    })),
}));
