import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Asset } from "./allocationsData";

export function ScrollableAssetList({
  assets,
  activeIndex,
  setActiveIndex,
  scrollAreaRef,
}: {
  assets: Asset[];
  activeIndex: number | undefined;
  setActiveIndex: (index: number | undefined) => void;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <ScrollArea className="h-[300px]" ref={scrollAreaRef}>
      {assets.map((asset, index) => (
        <div
          key={index}
          data-index={index}
          className={`flex items-center py-1 w-full ${
            activeIndex !== undefined && activeIndex !== index
              ? "opacity-20"
              : ""
          }`}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(undefined)}
        >
          <div className="flex items-center w-1/2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: asset.color }}
            ></div>
            <span className="pl-2 select-none">{asset.symbol}</span>
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
    </ScrollArea>
  );
}
