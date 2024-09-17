import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Personal Fund Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$100,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Number of Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">15</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-600">+5.2%</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex space-x-4">
        <Link href="/portfolio">
          <Button>View Portfolio</Button>
        </Link>
        <Link href="/transactions">
          <Button variant="outline">View Transactions</Button>
        </Link>
      </div>
    </div>
  )
}