import { NextResponse } from "next/server";
import { PortfolioAllocationModel } from "@/models/PortfolioAllocation";

interface DataPoint {
  timestamp: number;
  value: number;
}

function generateWeekMockData(): DataPoint[] {
  const weekData: DataPoint[] = [];
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - 7);

  let currentValue = 1000;

  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour += 2) {
      // 12 data points per day
      const timestamp = new Date(startDate);
      timestamp.setDate(startDate.getDate() + day);
      timestamp.setHours(hour, 0, 0, 0);

      const change = (Math.random() - 0.5) * 10;
      currentValue += change;

      weekData.push({
        timestamp: timestamp.getTime(),
        value: parseFloat(currentValue.toFixed(2)),
      });
    }
  }

  return weekData;
}

function generateMonthMockData(): DataPoint[] {
  const monthData: DataPoint[] = [];
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - 30);

  let currentValue = 1000;

  for (let day = 0; day < 30; day++) {
    for (let i = 0; i < 3; i++) {
      // 3 data points per day
      const timestamp = new Date(startDate);
      timestamp.setDate(startDate.getDate() + day);
      timestamp.setHours(8 + i * 4, 0, 0, 0); // 8AM, 12PM, 4PM

      const change = (Math.random() - 0.5) * 15;
      currentValue += change;

      monthData.push({
        timestamp: timestamp.getTime(),
        value: parseFloat(currentValue.toFixed(2)),
      });
    }
  }

  return monthData;
}

function generateThreeMonthMockData(): DataPoint[] {
  const threeMonthData: DataPoint[] = [];
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - 90);

  let currentValue = 1000;

  for (let day = 0; day < 90; day++) {
    const timestamp = new Date(startDate);
    timestamp.setDate(startDate.getDate() + day);
    timestamp.setHours(12, 0, 0, 0); // Noon each day

    const change = (Math.random() - 0.5) * 20;
    currentValue += change;

    threeMonthData.push({
      timestamp: timestamp.getTime(),
      value: parseFloat(currentValue.toFixed(2)),
    });
  }

  return threeMonthData;
}

function generateYearMockData(): DataPoint[] {
  const yearData: DataPoint[] = [];
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setFullYear(startDate.getFullYear() - 1);

  let currentValue = 1000;

  for (let day = 0; day < 365; day += 4) {
    // Every 4 days
    const timestamp = new Date(startDate);
    timestamp.setDate(startDate.getDate() + day);
    timestamp.setHours(12, 0, 0, 0); // Noon each day

    const change = (Math.random() - 0.5) * 30;
    currentValue += change;

    yearData.push({
      timestamp: timestamp.getTime(),
      value: parseFloat(currentValue.toFixed(2)),
    });
  }

  return yearData;
}

function getData(selectedPeriod: string): DataPoint[] {
  switch (selectedPeriod) {
    case "week":
      return generateWeekMockData();
    case "month":
      return generateMonthMockData();
    case "threeMonth":
      return generateThreeMonthMockData();
    case "year":
      return generateYearMockData();
    default:
      return generateWeekMockData();
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const portfolioId = searchParams.get("portfolioId");
  const period = searchParams.get("period");

  return NextResponse.json({
    weekData: getData("week"),
    monthData: getData("month"),
    threeMonthData: getData("threeMonth"),
    yearData: getData("year"),
  });

  // try {
  //   const allocations =
  //     await PortfolioAllocationModel.getPortfolioAllocations(portfolioId);
  //   return NextResponse.json(allocations);
  // } catch (error) {
  //   console.error("Error fetching portfolio allocations:", error);
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 },
  //   );
  // }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newAllocation = await PortfolioAllocationModel.create(body);
    return NextResponse.json(newAllocation, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio allocation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
