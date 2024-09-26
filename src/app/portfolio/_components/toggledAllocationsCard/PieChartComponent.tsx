import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Asset } from "./allocationsData";

export function PieChartComponent({
  assets,
  activeIndex,
  setActiveIndex,
  handlePieScroll,
  getData,
}: {
  assets: Asset[];
  activeIndex: number | undefined;
  setActiveIndex: (index: number | undefined) => void;
  handlePieScroll: (index: number) => void;
  getData: Asset | null;
}) {
  return (
    <div className="md:w-[300px]">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={assets}
            dataKey="percentage"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="70%"
            innerRadius="60%"
            paddingAngle={4}
            onMouseEnter={(_, index) => {
              setActiveIndex(index);
              handlePieScroll(index);
            }}
            onMouseLeave={() => setActiveIndex(undefined)}
            activeIndex={activeIndex}
          >
            {assets.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke=""
                strokeWidth={0.2}
                opacity={
                  activeIndex === undefined || activeIndex === index ? 1 : 0.2
                }
              />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-base"
          >
            {getData ? (
              <>
                <tspan x="50%" dy="-1em" className="font-extrabold">
                  {getData.name}
                </tspan>
                <tspan x="50%" dy="1.2em" className="font-extralight">
                  {`${getData.percentage.toFixed(2)}%`}
                </tspan>

                <tspan x="50%" dy="1.2em" className="font-extralight">
                  {`${getData.amount ? "$" + getData.amount : ""}`}
                </tspan>
              </>
            ) : (
              <tspan x="50%" dy="" className="font-extralight">
                select a security
              </tspan>
            )}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
