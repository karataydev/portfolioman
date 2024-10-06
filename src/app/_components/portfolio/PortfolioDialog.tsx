import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import { newPortfolio } from "../homePage/homePageData";

export interface PortfolioRequest {
  name: string;
  description?: string;
  allocations: AllocationRequest[];
}

export interface AllocationRequest {
  asset_id: number;
  target_percentage: number;
}

// Mock data for assets
const mockAssets = [
  { id: 1, name: "Asset 1" },
  { id: 2, name: "Asset 2" },
  { id: 3, name: "Asset 3" },
];

export function PortfolioDialog({
  isEdit = false,
  handleAccept,
  isOpen,
  onClose,
}: {
  isEdit: boolean;
  handleAccept: (e: PortfolioRequest) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<PortfolioRequest>({
    name: "",
    description: undefined,
    allocations: [],
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        description: undefined,
        allocations: [],
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      handleAccept(formData);
    } catch (error) {
      console.error("Error handle portfolio:", error);
    }
  };

  const addAllocation = () => {
    setFormData({
      ...formData,
      allocations: [
        ...formData.allocations,
        { asset_id: 0, target_percentage: 0 },
      ],
    });
  };

  const updateAllocation = (
    index: number,
    field: keyof AllocationRequest,
    value: number,
  ) => {
    const newAllocations = [...formData.allocations];
    newAllocations[index] = { ...newAllocations[index], [field]: value };
    setFormData({ ...formData, allocations: newAllocations });
  };

  const removeAllocation = (index: number) => {
    const newAllocations = formData.allocations.filter((_, i) => i !== index);
    setFormData({ ...formData, allocations: newAllocations });
  };

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>New Portfolio</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="portfolio_name">Name</Label>
          <Input
            id="portfolio_name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="portfolio_description">Description</Label>
          <Input
            id="portfolio_description"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <Label>Allocations</Label>
            <Button type="button" onClick={addAllocation} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.allocations.map((allocation, index) => (
            <div key={index} className="flex justify-between mt-2 items-center">
              <div className="flex space-x-2 flex-grow">
                <Select
                  onValueChange={(value) =>
                    updateAllocation(index, "asset_id", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAssets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id.toString()}>
                        {asset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Target %"
                  value={allocation.target_percentage}
                  onChange={(e) =>
                    updateAllocation(
                      index,
                      "target_percentage",
                      Number(e.target.value),
                    )
                  }
                  className="w-24"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeAllocation(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter className="flex space-x-0 flex-row">
          <div className="w-1/3 pr-2">
            <Button
              type="button"
              variant="third"
              onClick={onClose}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
          <div className="w-2/3 pl-2">
            <Button type="submit" className="w-full">
              Create Portfolio
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
