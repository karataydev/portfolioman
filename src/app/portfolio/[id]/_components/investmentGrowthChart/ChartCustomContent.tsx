import { formatDate } from "@/lib/utils";

export const ChartCustomContent = ({ active, coordinate, payload }) => {
  if (active && payload && payload.length) {
    const x = coordinate?.x ?? 0;
    const payloadPoint = payload[0].payload;
    const timestamp = payloadPoint.timestamp;
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
