import { useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Chart } from "react-google-charts";

interface GraphData {
  yearMonth: string; // 연월 정보 (예: "21.12")
  averagePrice: number; // 평균 가격
  isMaxMinPrice: string; // "최고" 또는 "최소" (선택적 필드)
  tradeCount: number;
}

const processGraphData = (
  data: GraphData[]
): { results: GraphData[]; dynamicTicks: { v: number; f: string }[] } => {
  const startDate = new Date(2022, 0); // 22.01
  const endDate = new Date(2024, 10); // 24.11
  const months: string[] = [];
  const results: GraphData[] = [];
  let lastPrice = 0;
  // Generate list of all months between startDate and endDate
  for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
    months.push(
      `${d.getFullYear().toString().slice(2)}.${String(d.getMonth() + 1).padStart(2, "0")}`
    );
  }

  let minPrice = Infinity;
  let maxPrice = -Infinity;

  months.forEach((month) => {
    // console.log(month);
    const entry = data.find((item) => {
      return item.yearMonth === `20${month.slice(0, 2)}-${month.slice(3, 5)}-01`;
    });
    if (entry) {
      results.push({ ...entry, yearMonth: month }); // Random 0-10
      lastPrice = entry.averagePrice;

      if (entry.isMaxMinPrice === "최소") {
        minPrice = Math.min(minPrice, entry.averagePrice);
      }
      if (entry.isMaxMinPrice === "최고") {
        maxPrice = Math.max(maxPrice, entry.averagePrice);
      }
    } else {
      results.push({
        yearMonth: month,
        averagePrice: lastPrice || minPrice || 0,
        isMaxMinPrice: "",
        tradeCount: 0,
      });
    }
  });

  // Adjust min and max prices
  const adjustedMinPrice = Math.floor(minPrice / 10000) * 10000;
  const adjustedMaxPrice = Math.ceil(maxPrice / 10000) * 10000;

  const tickStep = Math.round((adjustedMaxPrice - adjustedMinPrice) / 4);
  const dynamicTicks: Array<{ v: number; f: string }> = [];

  for (let i = 0; i <= 4; i++) {
    const value = adjustedMinPrice + i * tickStep;
    dynamicTicks.push({
      v: value,
      f: `${(value / 10000).toFixed(1)}억`,
    });
  }
  return { results, dynamicTicks };
};

const TradeChart: React.FC<{ graphData: GraphData[] }> = ({ graphData }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  // Process trade details
  const { results: processedData, dynamicTicks } = processGraphData(graphData);
  const lineChartData: any[] = [["날짜", "평균 가격", { role: "annotation" }]];
  const barChartData: any[] = [["날짜", "매물 수"]];
  processedData.forEach(({ yearMonth, averagePrice, isMaxMinPrice, tradeCount }) => {
    lineChartData.push([yearMonth, averagePrice, isMaxMinPrice]);
    barChartData.push([yearMonth, tradeCount]);
  });
  return (
    <div>
      {/* Line Chart for Prices */}
      <Chart
        chartType="LineChart"
        width="358px"
        height="400px"
        style={{ backgroundColor: bgColor }}
        data={lineChartData}
        options={{
          title: "시세 추이",
          hAxis: { title: "Date", format: "yyyy.MM", slantedText: true },
          vAxis: {
            title: "가격 (억 원)",
            // minValue: 1000000,
            format: "#억", // 사용자 지정 서식
            ticks: dynamicTicks as unknown as number[], // 주요 지점을 직접 지정
          },
          annotations: {
            textStyle: { fontSize: 12, color: "#ff6b6b" },
            stem: { color: "transparent" },
          },
          legend: "none",
          tooltip: { isHtml: true },
          colors: ["#F37021"],
          backgroundColor: bgColor,
        }}
      />

      {/* Bar Chart for Transaction Volume */}
      <Chart
        chartType="ColumnChart"
        width="358px"
        height="100px"
        data={barChartData}
        options={{
          title: "월별 거래된 매물 수",
          hAxis: { title: "Date", format: "yyyy.MM", slantedText: true },
          vAxis: { title: "매물 수", minValue: 0 },
          legend: "none",
          colors: ["#F37021"],
          backgroundColor: bgColor,
        }}
      />
    </div>
  );
};

export default TradeChart;
