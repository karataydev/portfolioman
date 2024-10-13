"use client";

import * as React from "react";
import { ChevronDown, Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiFetch } from "@/lib/utils";

interface SimpleAssetDTO {
  id: number;
  name: string;
  symbol: string;
}

interface AssetResponse {
  assets: SimpleAssetDTO[];
  total_count: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface AssetSelectorProps {
  onSelect: (assetId: number) => void;
  value: number | null;
}

export default function AssetSelector({ onSelect, value }: AssetSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [assets, setAssets] = React.useState<SimpleAssetDTO[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const observerTarget = React.useRef<HTMLDivElement>(null);

  const fetchAssets = React.useCallback(
    async (searchQuery: string, pageNum: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFetch<AssetResponse>(
          `/api/asset/search?q=${encodeURIComponent(searchQuery)}&limit=20&page=${pageNum}`,
        );
        if ("error" in response && response.error) {
          setError("Error fetching assets. Please try again.");
        } else if ("data" in response && response.data) {
          setAssets((prevAssets) =>
            pageNum === 1
              ? response.data.assets
              : [...prevAssets, ...response.data.assets],
          );
          setHasMore(response.data.page < response.data.total_pages);
        } else {
          setError("Received invalid data from the server.");
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchAssets(query, 1);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, fetchAssets]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  React.useEffect(() => {
    if (page > 1) {
      fetchAssets(query, page);
    }
  }, [page, query, fetchAssets]);

  const selectedAsset = assets.find((asset) => asset.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedAsset ? selectedAsset.name : "Select asset..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search asset..."
            className="h-9"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-[200px] overflow-y-auto">
            <CommandEmpty>{error || "No asset found."}</CommandEmpty>
            <CommandGroup>
              {assets.map((asset) => (
                <CommandItem
                  key={asset.id}
                  value={asset.id.toString()}
                  onSelect={() => {
                    onSelect(asset.id);
                    setOpen(false);
                  }}
                >
                  {asset.name} ({asset.symbol})
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === asset.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            {hasMore && <div ref={observerTarget} className="h-1" />}
          </CommandList>
          {loading && (
            <div className="flex justify-center p-2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
