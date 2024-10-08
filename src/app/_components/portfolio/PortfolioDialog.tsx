import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import AssetSelector from "@/components/AssetSelector";

export interface PortfolioRequest {
  name: string;
  description?: string;
  allocations: AllocationRequest[];
}

export interface AllocationRequest {
  asset_id: number;
  target_percentage: number;
}

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
      console.error("Error handling portfolio:", error);
    }
  };

  const addAllocation = () => {
    setFormData(prev => ({
      ...prev,
      allocations: [
        ...prev.allocations,
        { asset_id: 0, target_percentage: 0 },
      ],
    }));
  };

  const updateAllocation = (
    index: number,
    field: keyof AllocationRequest,
    value: number
  ) => {
    setFormData(prev => {
      const newAllocations = [...prev.allocations];
      newAllocations[index] = { ...newAllocations[index], [field]: value };
      return { ...prev, allocations: newAllocations };
    });
  };

  const removeAllocation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      allocations: prev.allocations.filter((_, i) => i !== index),
    }));
  };

  console.log('PortfolioDialog rendered. Current formData:', formData);

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
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="portfolio_description">Description</Label>
          <Input
            id="portfolio_description"
            type="text"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
                <AssetSelector
                  onSelect={(value) => updateAllocation(index, "asset_id", value)}
                  value={allocation.asset_id}
                />
                <Input
                  type="number"
                  placeholder="Target %"
                  value={allocation.target_percentage}
                  onChange={(e) =>
                    updateAllocation(
                      index,
                      "target_percentage",
                      parseFloat(e.target.value)
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