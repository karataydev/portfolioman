import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";

const current = [
  { icon: "/apple--600.png", name: "MKG", percentage: 49.0, color: "#FF6384" },
  {
    icon: "/apple--600.png",
    name: "Altin",
    percentage: 10.665,
    amount: 200,
    color: "#36A2EB",
  },
  {
    icon: "/apple--600.png",
    name: "Altin6",
    percentage: 10.5,
    amount: 200,
    color: "#36A2EB",
  },
  {
    icon: "/apple--600.png",
    name: "Altin4",
    percentage: 10.5,
    amount: 200,
    color: "#36A2EB",
  },
  {
    icon: "/apple--600.png",
    name: "Altin3",
    percentage: 10.5,
    amount: 200,
    color: "#36A2EB",
  },
  {
    icon: "/apple--600.png",
    name: "Altin2",
    percentage: 10.5,
    amount: 200,
    color: "#36A2EB",
  },
  {
    icon: "/apple--600.png",
    name: "Mevduat Faizi",
    percentage: 5.0,
    color: "#FFCE56",
  },
  {
    icon: "/apple--600.png",
    name: "Dolar",
    percentage: 25.0,
    color: "#4BC0C0",
  },
  {
    icon: "/apple--600.png",
    name: "BIST 100",
    percentage: 10.5,
    color: "#9966FF",
  },
];
const target = [
  { icon: "/apple--600.png", name: "MKG", percentage: 40.0, color: "#FF6384" },
  {
    icon: "/apple--600.png",
    name: "Altin",
    percentage: 10.555,
    amount: 200,
    color: "#36A2EB",
  },
  {
    icon: "/apple--600.png",
    name: "Mevduat Faizi",
    percentage: 14.0,
    color: "#FFCE56",
  },
  {
    icon: "/apple--600.png",
    name: "Dolar",
    percentage: 20.0,
    color: "#4BC0C0",
  },
  {
    icon: "/apple--600.png",
    name: "BIST 100",
    percentage: 15.5,
    color: "#9966FF",
  },
];

const CustomTooltip: React.FC<
  TooltipProps<number, string> & { mydata: Asset | null }
> = ({ active, payload, mydata }) => {
  console.log(mydata);
  if (active && mydata) {
    const data = mydata;

    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-bold">{data.name}</p>
        <p>{`Percentage: ${data.percentage.toFixed(2)}%`}</p>
        {data.amount && <p>{`Amount: $${data.amount}`}</p>}
      </div>
    );
  }
  return null;
};

interface Asset {
  icon: string;
  name: string;
  percentage: number;
  amount?: number;
  color: string;
}

export function ToggledAllocationsCard() {
  const [isCurrentAllocation, setIsCurrentAllocation] = useState(false);
  const [assets, setAssets] = useState<Asset[]>(target);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    setAssets(isCurrentAllocation ? current : target);
  }, [isCurrentAllocation]);

  const onPieEnter = (_: unknown, index: number) => {
    console.log(index);
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  const isActiveIndex = (index: number) => {
    return index === activeIndex;
  };

  return (
    <div className="w-full bg-background">
      <div className="w-full flex flex-col px-4 py-4">
        <h2 className="text-xl font-semibold mb-2">Portfolio Value</h2>
        <div className="flex justify-between items-center">
          <div className="font-semibold text-2xl text-foreground tracking-wider">
            $15,498.24
          </div>
          <div className="flex items-center space-x-4">
            <Label
              htmlFor="allocation-toggle"
              className="text-sm font-medium w-10"
            >
              {isCurrentAllocation ? "Current" : "Target"}
            </Label>
            <Switch
              id="allocation-toggle"
              checked={isCurrentAllocation}
              onCheckedChange={setIsCurrentAllocation}
            />
          </div>
        </div>
        <p className="text-sm text-second mt-1">
          {isCurrentAllocation
            ? "Showing current allocation of your portfolio"
            : "Showing target allocation for your portfolio"}
        </p>
      </div>
      <Card className="w-full text-foreground text-sm pt-1 bg-backgroundroot border-0">
        <CardContent>
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
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                activeIndex={activeIndex}
              >
                {assets.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke=""
                    strokeWidth={0.2}
                    opacity={
                      activeIndex === -1 || activeIndex === index ? 1 : 0.6
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                active={activeIndex !== -1}
                content={<CustomTooltip mydata={assets[activeIndex]} />}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4">
            {assets.map((asset, index) => (
              <div
                key={index}
                className={`flex items-center py-1 w-full ${
                  activeIndex !== null && !isActiveIndex(index)
                    ? "opacity-40"
                    : ""
                }`}
                onMouseEnter={() => {
                  onPieEnter(null, index);
                }}
                onMouseLeave={() => {
                  onPieLeave();
                }}
              >
                <div className="flex items-center w-1/2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: asset.color }}
                  ></div>
                  <span className="pl-2 select-none">{asset.name}</span>
                </div>
                <div className="flex items-center w-full">
                  <Progress
                    className="flex max-w-full cursor-pointer"
                    value={asset.percentage}
                  />
                  <div className="flex place-content-end w-24">
                    <span className="select-none">
                      {asset.percentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
