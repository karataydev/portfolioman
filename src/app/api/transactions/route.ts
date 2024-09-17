import { NextResponse } from "next/server";
import { TransactionModel } from "@/models/Transaction";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const portfolioId = searchParams.get("portfolioId");

  if (!portfolioId) {
    return NextResponse.json(
      { error: "Portfolio ID is required" },
      { status: 400 },
    );
  }

  try {
    const transactions =
      await TransactionModel.getPortfolioTransactions(portfolioId);
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTransaction = await TransactionModel.create(body);
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
