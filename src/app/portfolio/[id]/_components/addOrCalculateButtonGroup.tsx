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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface PurchaseRecommendation {
  symbol: string;
  sharesToBuy: number;
}

interface AddOrCalculateButtonGroupProps {
  addStock: (e: AddTransactionData) => void;
  calculatePurchase: (e: React.FormEvent) => void;
  purchaseRecommendation: PurchaseRecommendation[];
}

export interface AddTransactionData {
  symbol: string;
  side: number; // Changed to number
  quantity: number; // Changed to number
  avg_price: number; // Changed to number
}

export function AddOrCalculateButtonGroup({
  addStock,
  calculatePurchase,
  purchaseRecommendation,
}: AddOrCalculateButtonGroupProps) {
  const [formData, setFormData] = useState<AddTransactionData>({
    symbol: "",
    side: 0, // Changed to 0 (number)
    quantity: 0, // Changed to 0 (number)
    avg_price: 0, // Changed to 0 (number)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addStock(formData);
      setFormData({
        symbol: "",
        side: 0, // Changed to 0 (number)
        quantity: 0, // Changed to 0 (number)
        avg_price: 0, // Changed to 0 (number)
      });
    } catch (error) {
      console.error("Error adding stock:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                type="text"
                required
                value={formData.symbol}
                onChange={(e) =>
                  setFormData({ ...formData, symbol: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="side">Side</Label>
              <Select
                value={formData.side.toString()} // Convert to string for Select component
                onValueChange={
                  (value) => setFormData({ ...formData, side: parseInt(value) }) // Parse string to number
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select side" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Buy</SelectItem>
                  <SelectItem value="1">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity">Number of Shares</Label>
              <Input
                id="quantity"
                type="number"
                step=".001"
                required
                value={formData.quantity.toString()} // Convert to string for input
                onChange={
                  (e) =>
                    setFormData({
                      ...formData,
                      quantity: parseFloat(e.target.value),
                    }) // Parse string to number
                }
              />
            </div>
            <div>
              <Label htmlFor="avgPrice">Average Price</Label>
              <Input
                id="avgPrice"
                type="number"
                step=".001"
                required
                value={formData.avg_price.toString()} // Convert to string for input
                onChange={
                  (e) =>
                    setFormData({
                      ...formData,
                      avg_price: parseFloat(e.target.value),
                    }) // Parse string to number
                }
              />
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
