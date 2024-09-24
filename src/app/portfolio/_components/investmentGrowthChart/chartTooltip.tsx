import { Tooltip } from "recharts";
import { CustomCursor } from "./chartCustomCursor";

export const ChartTooltip = () => {
  return (
    <Tooltip
      content={(props) => {
        if (props.active && props.payload && props.payload.length) {
          const x = props.coordinate?.x ?? 0;
          const payload = props.payload[0].payload;
          return <CustomCursor x={x} y={0} payload={[{ payload }]} />;
        }
        return null;
      }}
      cursor={{
        stroke: "#888888",
        strokeWidth: 1,
        strokeDasharray: "5 5",
      }}
    />
  );
};
