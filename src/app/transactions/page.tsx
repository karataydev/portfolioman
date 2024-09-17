'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Transaction {
  id: string
  asset_name: string
  transaction_type: 'BUY' | 'SELL'
  quantity: number
  price_per_unit: number
  transaction_date: string
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch('/api/transactions?portfolioId=1') // Assuming portfolio ID 1
      const data = await response.json()
      setTransactions(data)
    }
    fetchTransactions()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.asset_name}</TableCell>
                  <TableCell>{transaction.transaction_type}</TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>${transaction.price_per_unit.toFixed(2)}</TableCell>
                  <TableCell>{new Date(transaction.transaction_date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}