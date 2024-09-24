import React from "react";
import { Line } from "recharts";

export const renderChartLines = (selectedComparedAsset: string | null) => (
  <>
    <Line
      type="monotone"
      dataKey="main"
      stroke="#3a7bd5"
      dot={false}
      strokeWidth={2.5}
      activeDot={{ r: 8 }}
    />
    {selectedComparedAsset && (
      <Line
        key={selectedComparedAsset}
        type="monotone"
        dataKey="compared"
        name={selectedComparedAsset}
        stroke="#6d7784"
        dot={false}
        strokeWidth={1.5}
      />
    )}
  </>
);
