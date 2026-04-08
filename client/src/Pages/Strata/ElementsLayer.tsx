import { Layer, Rect } from "react-konva";
import { useWorkspaceStore } from "./useStrataTools";

const ElementsLayer = () => {
  const elements = useWorkspaceStore((state) => state.elements);

  return (
    <Layer>
      {elements.map((el) => {
        if (el.type === "rect") {
          return (
            <Rect
              key={el.id}
              x={el.x}
              y={el.y}
              width={el.width}
              height={el.height}
              fill={el.fill}
              cornerRadius={4}
            />
          );
        }
        return null;
      })}
    </Layer>
  );
};

export default ElementsLayer;
