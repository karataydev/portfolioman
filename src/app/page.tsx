import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">TODO</h1>
      <div className="flex space-x-4">
        <Link href="/portfolio">
          <Button>View Portfolio</Button>
        </Link>
      </div>
    </div>
  );
}
