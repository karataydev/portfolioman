import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AVAILABLE_ASSETS, ComparisonSelectorProps } from "./comparisonSelectorData";

export function ComparisonSelector({
  selectedAsset,
  onSelect,
  onRemove,
}: ComparisonSelectorProps) {
  return (
    <div className="flex flex-col gap-2 mt-4 w-full px-4">
      <p className="text-sm text-gray-500">Select an asset to compare:</p>
      <div className="flex items-center gap-2">
        <Select value={selectedAsset || ""} onValueChange={onSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Compare with..." />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_ASSETS.map((asset) => (
              <SelectItem key={asset} value={asset}>
                {asset}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedAsset && (
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <X className="h-4 w-4 text-second" />
          </Button>
        )}
      </div>
    </div>
  );
}
