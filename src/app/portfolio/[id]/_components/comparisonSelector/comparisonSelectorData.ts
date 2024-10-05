export interface ComparisonSelectorProps {
  selectedAsset: string | null;
  onSelect: (symbol: string) => void;
  onRemove: () => void;
}

export const AVAILABLE_ASSETS = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "AMZN",
  "FB",
  "TSLA",
  "NVDA",
  "JPM",
  "V",
  "JNJ",
];
