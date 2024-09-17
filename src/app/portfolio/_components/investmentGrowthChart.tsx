import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
} from "recharts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from "@heroicons/react/24/solid";

interface DataPoint {
  timestamp: number;
  value: number;
}

interface InvestmentGrowthChartProps {
  weekData: DataPoint[];
  monthData: DataPoint[];
  threeMonthData: DataPoint[];
  yearData: DataPoint[];
}

const initialData: DataPoint = {
  timestamp: new Date().setDate(new Date().getDate() - 7),
  value: 1000,
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
};

const CustomCursor = ({
  x,
  y,
  payload,
}: {
  x: number;
  y: number;
  payload: any[];
}) => {
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

export const InvestmentGrowthChart: React.FC<InvestmentGrowthChartProps> = ({
  weekData,
  monthData,
  threeMonthData,
  yearData,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("week");
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const getData = () => {
    switch (selectedPeriod) {
      case "week":
        return [initialData, ...weekData];
      case "month":
        return monthData;
      case "threeMonth":
        return threeMonthData;
      case "year":
        return yearData;
      default:
        return weekData;
    }
  };

  const data = useMemo(
    () => getData(),
    [selectedPeriod, weekData, monthData, threeMonthData, yearData],
  );
  const latestPrice = useMemo(
    () => data[data?.length - 1]?.value || 1000,
    [data],
  );

  const { minValue, maxValue } = useMemo(() => {
    const values = data.map((d) => d.value);
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values),
    };
  }, [data]);

  const yAxisDomain = useMemo(() => {
    const padding = (maxValue - minValue) * 0.1; // 10% padding
    return [Math.max(0, minValue - padding), maxValue + padding];
  }, [minValue, maxValue]);

  const getDescription = () => {
    switch (selectedPeriod) {
      case "week":
        return "Value of $1000 invested one week ago";
      case "month":
        return "Value of $1000 invested one month ago";
      case "threeMonth":
        return "Value of $1000 invested three months ago";
      case "year":
        return "Value of $1000 invested one year ago";
      default:
        return "Investment growth over time";
    }
  };

  const calculatePercentage = (value: number) => {
    return ((value - initialData.value) / initialData.value) * 100;
  };

  const isUp = () => {
    return (
      (selectedPrice !== null && selectedPrice >= initialData.value) ||
      (!selectedPrice && latestPrice && latestPrice >= initialData.value)
    );
  };

  return (
    <div className="w-full space-y-4 relative">
      <div className="text-center font-light text-sm mb-2">
        {getDescription()}
      </div>
      <div className="h-64 relative">
        <div className="absolute top-0 left-0 p-2 bg-background bg-opacity-75 rounded font-semibold text-lg text-foreground tracking-wider">
          $
          {selectedPrice !== null
            ? selectedPrice.toFixed(2)
            : latestPrice.toFixed(2)}{" "}
          <span
            className={
              (isUp() ? "text-green-600 " : "text-red-600 ") + "ml-1 text-sm"
            }
          >
            {isUp() ? (
              <ArrowUpRightIcon className="inline-block w-5 h-5 mr-1 font-black" />
            ) : (
              <ArrowDownRightIcon className="inline-block w-5 h-5 mr-1 font-bold" />
            )}
            {selectedPrice !== null
              ? calculatePercentage(selectedPrice).toFixed(2)
              : calculatePercentage(latestPrice).toFixed(2)}
            %
          </span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
            onMouseMove={(e) => {
              if (e.activePayload) {
                setSelectedPrice(e.activePayload[0].value);
              }
            }}
            onMouseLeave={() => setSelectedPrice(null)}
          >
            <XAxis dataKey="timestamp" hide={true} />
            <YAxis hide={true} domain={yAxisDomain} />
            <Tooltip
              content={<CustomCursor />}
              cursor={{
                stroke: "#888888",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
            />
            <ReferenceLine y={1000} stroke="#888888" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3a7bd5"
              dot={false}
              strokeWidth={2.5}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ToggleGroup
        type="single"
        value={selectedPeriod}
        onValueChange={(value) => value && setSelectedPeriod(value)}
        className="justify-center"
      >
        <ToggleGroupItem value="week">W</ToggleGroupItem>
        <ToggleGroupItem value="month">M</ToggleGroupItem>
        <ToggleGroupItem value="threeMonth">3M</ToggleGroupItem>
        <ToggleGroupItem value="year">Y</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
