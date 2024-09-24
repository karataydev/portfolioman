import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PurchaseRecommendation {
  symbol: string;
  sharesToBuy: number;
}

interface AddOrCalculateButtonGroupProps {
  addStock: (e: React.FormEvent) => void;
  calculatePurchase: (e: React.FormEvent) => void;
  purchaseRecommendation: PurchaseRecommendation[];
}

export function AddOrCalculateButtonGroup({
  addStock,
  calculatePurchase,
  purchaseRecommendation,
}: AddOrCalculateButtonGroupProps) {
  return (
    <div className="flex flex-wrap justify-between md:justify-end my-6 gap-1 md:gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="third"
            className="px-4 flex-grow md:flex-grow-0 md:px-8 md:py-4"
          >
            Add Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={addStock} className="space-y-4">
            <div>
              <Label htmlFor="symbol">Symbol</Label>
              <Input id="symbol" type="text" required />
            </div>
            <div>
              <Label htmlFor="shares">Number of Shares</Label>
              <Input id="shares" type="number" step=".001" required />
            </div>
            <div>
              <Label htmlFor="currentPrice">Current Price</Label>
              <Input id="currentPrice" type="number" step=".001" required />
            </div>
            <DialogFooter>
              <Button type="submit">Add Transaction</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-4 flex-grow md:flex-grow-0 md:px-8 md:py-4">
            Calculate Purchase
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Calculate Purchase</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="purchaseAmount">Purchase Amount ($)</Label>
              <Input id="purchaseAmount" type="number" />
            </div>
            <DialogFooter>
              <Button onClick={calculatePurchase}>Calculate</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
