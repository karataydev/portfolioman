import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import debounce from 'lodash/debounce';
import { apiFetch } from '@/lib/utils';

interface SimpleAssetDTO {
  id: number;
  name: string;
  symbol: string;
}

interface AssetSelectorProps {
  onSelect: (assetId: number) => void;
  value: number | null;
}

const AssetSelector: React.FC<AssetSelectorProps> = ({ onSelect, value }) => {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<SimpleAssetDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  console.log('AssetSelector rendered. Assets:', assets, 'Value:', value);

  const fetchAssets = useCallback(async (searchQuery: string) => {
    console.log('Fetching assets with query:', searchQuery);
    setLoading(true);
    try {
      const { data, error } = await apiFetch<{ assets: SimpleAssetDTO[] }>(`/api/assets?q=${encodeURIComponent(searchQuery)}&limit=10&page=1`);
      if (error) {
        console.error('Error fetching assets:', error);
        setAssets([]);
      } else if (data && Array.isArray(data.assets)) {
        setAssets(data.assets);
      } else {
        console.error('Invalid data format received:', data);
        setAssets([]);
      }
    } catch (error) {
      console.error('Error in fetchAssets:', error);
      setAssets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetch = useMemo(
    () => debounce((searchQuery: string) => {
      console.log('Debounced fetch called with query:', searchQuery);
      fetchAssets(searchQuery);
    }, 300),
    [fetchAssets]
  );

  useEffect(() => {
    if (query) {
      debouncedFetch(query);
    } else {
      setAssets([]);
    }

    return () => {
      debouncedFetch.cancel();
    };
  }, [query, debouncedFetch]);

  const handleSearch = useCallback((search: string) => {
    console.log('Search input changed:', search);
    setQuery(search);
  }, []);

  const selectedAsset = assets.find(asset => asset.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedAsset ? `${selectedAsset.name} (${selectedAsset.symbol})` : "Select asset..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search assets..." onValueChange={handleSearch} />
          <CommandEmpty>{loading ? "Loading..." : "No asset found."}</CommandEmpty>
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
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === asset.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {asset.name} ({asset.symbol})
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AssetSelector;