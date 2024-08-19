"use client";

import { Chip, Divider, Spacer } from "@nextui-org/react";
import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { NotificationIcon, SuccessIcon } from "../icons";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui";

const calculatePercent = (
  chartData: { findings: string; number: number; fill: string }[],
) => {
  const total = chartData.reduce((sum, item) => sum + item.number, 0);

  return chartData.map((item) => ({
    ...item,
    percent: Math.round((item.number / total) * 100) + "%",
  }));
};

const chartData = [
  {
    findings: "Success",
    number: 436,
    fill: "var(--color-success)",
  },
  { findings: "Fail", number: 293, fill: "var(--color-fail)" },
];

const updatedChartData = calculatePercent(chartData);

const chartConfig = {
  number: {
    label: "Findings",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  success: {
    label: "Success",
    color: "hsl(var(--chart-success))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  fail: {
    label: "Fail",
    color: "hsl(var(--chart-fail))",
  },
} satisfies ChartConfig;

export function StatusChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.number, 0);
  }, []);

  return (
    <div className="flex">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square min-w-[200px] md:min-h-[250px]"
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Pie
            data={chartData}
            dataKey="number"
            nameKey="findings"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-foreground"
                      >
                        Findings
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-col justify-center gap-y-2 mx-6">
        <div className="flex space-x-4">
          <Chip
            className="h-5"
            variant="flat"
            startContent={<SuccessIcon size={18} />}
            color="success"
            radius="lg"
            size="md"
          >
            {chartData[0].number}
          </Chip>
          <Divider orientation="vertical" />
          <span>{updatedChartData[0].percent}</span>
          <Divider orientation="vertical" />
        </div>
        <div className="flex items-center font-light leading-none">
          No change from last scan
        </div>
        <Spacer y={4} />
        <div className="flex flex-col gap-2 leading-none text-muted-foreground">
          <div className="flex space-x-4">
            <Chip
              className="h-5"
              variant="flat"
              startContent={<NotificationIcon size={18} />}
              color="danger"
              radius="lg"
              size="md"
            >
              {chartData[1].number}
            </Chip>
            <Divider orientation="vertical" />
            <span>{updatedChartData[1].percent}</span>
            <Divider orientation="vertical" />
          </div>
          <div className="flex items-center font-medium leading-none gap-1">
            +2 findings from last scan <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
