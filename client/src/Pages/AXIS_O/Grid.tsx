import { Layer, Circle } from "react-konva";
import { useWorkspaceStore } from "./useStrataTools";

const Grid = ({ darkMode }: { darkMode: boolean }) => {
  const camera = useWorkspaceStore((state) => state.camera);
  const spacing = 30;

  // Viewport culling math (only render what's visible)
  const startX = Math.floor(-camera.x / camera.zoom / spacing) * spacing;
  const startY = Math.floor(-camera.y / camera.zoom / spacing) * spacing;
  const width = window.innerWidth / camera.zoom;
  const height = window.innerHeight / camera.zoom;

  const dots = [];
  for (let x = startX; x < startX + width + spacing; x += spacing) {
    for (let y = startY; y < startY + height + spacing; y += spacing) {
      dots.push(
        <Circle
          key={`${x}-${y}`}
          x={x}
          y={y}
          radius={0.8 / camera.zoom}
          fill={darkMode ? "#3f3f46" : "#96969C"}
          listening={false}
        />,
      );
    }
  }

  return <Layer>{dots}</Layer>;
};

export default Grid;
