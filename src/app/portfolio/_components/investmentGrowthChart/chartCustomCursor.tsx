import { formatDate } from "@/lib/utils";

interface CustomCursorProps {
  x: number;
  y: number;
  payload: Array<{ payload: { timestamp: number } }>;
}

export const CustomCursor = ({ x, payload }: CustomCursorProps) => {
  if (payload && payload.length > 0) {
    const timestamp = payload[0].payload.timestamp;
    const formattedDate = formatDate(timestamp);
    return (
      <g>
        <text
          x={x}
          y={10}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#111"
        >
          {formattedDate}
        </text>
      </g>
    );
  }
  return null;
};