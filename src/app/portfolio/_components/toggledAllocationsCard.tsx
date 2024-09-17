import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const current = [
  { icon: "/apple--600.png", name: "MKG", percentage: 72.5 },
  { icon: "/apple--600.png", name: "Altin", percentage: 68.65, amount: 200 },
  {
    icon: "/apple--600.png",
    name: "Mevduat Faizi",
    percentage: 57.2,
  },
  { icon: "/apple--600.png", name: "Dolar", percentage: 25.7 },
  { icon: "/apple--600.png", name: "BIST 100", percentage: 21.65 },
];
const target = [
  { icon: "/apple--600.png", name: "MKG", percentage: 20.5 },
  { icon: "/apple--600.png", name: "Altin", percentage: 45.65 },
  {
    icon: "/apple--600.png",
    name: "Mevduat Faizi",
    percentage: 57.2,
  },
  { icon: "/apple--600.png", name: "Dolar", percentage: 16.7 },
  { icon: "/apple--600.png", name: "BIST 100", percentage: 21.65 },
];

export function ToggledAllocationsCard({}) {
  const [isCurrentAllocation, setIsCurrentAllocation] = useState(false);
  const [assets, setAssets] = useState(target);

  useEffect(() => {
    if (isCurrentAllocation) {
      setAssets(current);
    } else {
      setAssets(target);
    }
  }, [isCurrentAllocation]);

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
          {assets.map((asset, index) => (
            <div
              key={index}
              className="flex items-center justify-between pt-2 "
            >
              <div className="flex items-center space-x-3">
                <img
                  src={asset.icon}
                  alt={asset.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-light w-14 md:w-32">{asset.name}</span>
              </div>
              <div className="flex-grow mx-4">
                <Progress value={asset.percentage} />
              </div>
              <div className="text-second font-light w-12 md:w-16 flex-col">
                <span className="flex justify-end">{asset.percentage}%</span>
                <span className="flex justify-end">{asset.amount}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
