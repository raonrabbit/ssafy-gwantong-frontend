import React from "react";
import { Chart } from "react-google-charts";

const monthlyData = [
  ["Date", "Average Price", { role: "annotation" }, "Transaction Volume"],
  ["2021-12", 220000000, null, 0],
  ["2022-01", 220000000, null, 0],
  ["2022-02", 220000000, null, 0],
  ["2022-03", 220000000, null, 2],
  ["2022-04", 220000000, null, 0],
  ["2022-05", 220000000, null, 0],
  ["2022-06", 220000000, null, 3],
  ["2022-07", 220000000, null, 1],
  ["2022-08", 220000000, null, 0],
  ["2022-09", 225000000, "최고", 1],
  ["2022-10", 225000000, null, 0],
  ["2022-11", 225000000, null, 0],
  ["2022-12", 225000000, null, 5],
  ["2023-01", 225000000, null, 2],
  ["2023-02", 225000000, null, 3],
  ["2023-03", 225000000, null, 0],
  ["2023-04", 225000000, null, 0],
  ["2023-05", 180000000, null, 1],
  ["2023-06", 170000000, "최저", 2],
  ["2023-07", 170000000, null, 0],
  ["2023-08", 176000000, null, 2],
  ["2023-09", 176000000, null, 0],
  ["2023-10", 176000000, null, 1],
  ["2023-11", 176000000, null, 0],
  ["2023-12", 176000000, null, 0],
  ["2024-01", 183333333, null, 3],
  ["2024-02", 183333333, null, 3],
  ["2024-03", 183333333, null, 0],
  ["2024-04", 183333333, null, 2],
  ["2024-05", 190000000, null, 1],
  ["2024-06", 197000000, null, 1],
  ["2024-07", 192333333, null, 2],
  ["2024-08", 187500000, null, 3],
  ["2024-09", 180000000, null, 1],
  ["2024-10", 218000000, null, 1],
  ["2024-11", 218000000, null, 1],
];

// Individual transactions for each month with multiple transactions
const transactionData = [
  ["Date", "Transaction Price"],
  ["2022-03", 180000000],
  ["2022-03", 190000000],
  ["2022-06", 200000000],
  ["2022-06", 195000000],
  ["2022-06", 210000000],
  ["2022-07", 220000000],
  ["2022-12", 230000000],
  ["2022-12", 215000000],
  ["2022-12", 225000000],
  ["2022-12", 240000000],
  ["2022-12", 200000000],
  ["2023-01", 210000000],
  ["2023-01", 220000000],
  ["2023-02", 205000000],
  ["2023-02", 180000000],
  ["2023-02", 190000000],
  ["2023-05", 170000000],
  ["2023-08", 180000000],
  ["2023-08", 175000000],
  ["2023-10", 185000000],
  ["2024-02", 190000000],
  ["2024-02", 200000000],
  ["2024-02", 210000000],
  ["2024-04", 175000000],
  ["2024-04", 180000000],
  ["2024-06", 195000000],
  ["2024-07", 185000000],
  ["2024-07", 192000000],
  ["2024-08", 178000000],
  ["2024-08", 182000000],
  ["2024-08", 175000000],
  ["2024-10", 220000000],
  ["2024-11", 218000000],
];

const options = {
  title: "Real Estate Price and Transaction Volume",
  seriesType: "line",
  series: {
    0: { type: "line", color: "#3b82f6" },
    1: { type: "bars", targetAxisIndex: 1, color: "#d1d5db" },
  },
  annotations: {
    textStyle: {
      fontSize: 12,
      color: "#ff6b6b",
    },
    stem: {
      color: "transparent",
    },
  },
  vAxes: {
    0: { title: "Price (억 원)", minValue: 160000000, maxValue: 240000000 },
    1: { title: "Transaction Volume" },
  },
  hAxis: {
    title: "Date",
    format: "yyyy.MM",
    slantedText: true,
  },
  legend: "none",
  tooltip: { isHtml: true },
};

const TradeChart: React.FC = () => {
  return (
    <div>
      {/* Line Chart for Prices */}
      <Chart
        chartType="LineChart"
        width="358px"
        height="400px"
        data={monthlyData.map(([date, price, annotation]) => [date, price, annotation])}
        options={{
          title: "Price over Time",
          hAxis: { title: "Date", format: "yyyy.MM", slantedText: true },
          vAxis: { title: "Price (억 원)", minValue: 160000000, maxValue: 240000000 },
          annotations: {
            textStyle: { fontSize: 12, color: "#ff6b6b" },
            stem: { color: "transparent" },
          },
          legend: "none",
          tooltip: { isHtml: true },
          colors: ["#F37021"],
        }}
      />

      {/* Bar Chart for Transaction Volume */}
      <Chart
        chartType="ColumnChart"
        width="358px"
        height="100px"
        data={monthlyData.map(([date, , , volume]) => [date, volume])}
        options={{
          title: "Transaction Volume",
          hAxis: { title: "Date", format: "yyyy.MM", slantedText: true },
          vAxis: { title: "Transaction Volume", minValue: 0 },
          legend: "none",
          colors: ["#F37021"],
        }}
      />
    </div>
  );
};

export default TradeChart;

// import React from "react";
// import { Chart } from "react-google-charts";

// // Original data, with nulls where there are no transactions
// const rawData = [
//   ["Date", "Price", { role: "annotation" }, "Transaction Volume"],
//   ["2021-12", 220000000, null, 0],
//   ["2022-01", null, null, 0],
//   ["2022-02", null, null, 0],
//   ["2022-03", null, null, 0],
//   ["2022-04", null, null, 0],
//   ["2022-05", null, null, 0],
//   ["2022-06", null, null, 0],
//   ["2022-07", null, null, 0],
//   ["2022-08", null, null, 0],
//   ["2022-09", 225000000, null, 1],
//   ["2022-10", null, null, 0],
//   ["2022-11", null, null, 0],
//   ["2022-12", 225000000, null, 1],
//   ["2023-01", null, null, 0],
//   ["2023-02", null, null, 0],
//   ["2023-03", null, null, 0],
//   ["2023-04", null, null, 0],
//   ["2023-05", 180000000, null, 2],
//   ["2023-06", 170000000, null, 2],
//   ["2023-07", null, null, 0],
//   ["2023-08", 176000000, null, 3],
//   ["2023-09", null, null, 0],
//   ["2023-10", null, null, 0],
//   ["2023-11", null, null, 0],
//   ["2023-12", null, null, 0],
//   ["2024-01", 183333333, "최고", 3],
//   ["2024-02", null, null, 0],
//   ["2024-03", null, null, 0],
//   ["2024-04", null, null, 0],
//   ["2024-05", 190000000, null, 1],
//   ["2024-06", 197000000, null, 1],
//   ["2024-07", 192333333, null, 3],
//   ["2024-08", 187500000, null, 2],
//   ["2024-09", 180000000, "최저", 1],
//   ["2024-10", 218000000, null, 1],
//   ["2024-11", null, null, 0],
// ];

// // Base date for calculating months since start (Dec 2021)
// const baseDate = new Date(2021, 11); // December 2021

// const processChartData = (data: any) => {
//   let lastKnownPrice: any = null;
//   return data.map(([dateStr, price, annotation, volume]: any) => {
//     const [year, month] = dateStr.split("-").map(Number);
//     const date = new Date(year, month - 1);
//     const monthsSinceBase =
//       (year - baseDate.getFullYear()) * 12 + (month - 1 - baseDate.getMonth());

//     if (price === null && lastKnownPrice !== null) {
//       return [monthsSinceBase, lastKnownPrice, annotation, volume];
//     } else {
//       lastKnownPrice = price;
//       return [monthsSinceBase, price, annotation, volume];
//     }
//   });
// };

// const data = processChartData(rawData);

// // Separate data for each chart
// const lineChartData = [["Months Since Start", "Price", { role: "annotation" }]].concat(
//   data.map(([months, price, annotation]: any) => [months, Number(price), annotation])
// );

// const barChartData = [["Months Since Start", "Transaction Volume"]].concat(
//   data.map(([months, , , volume]: any) => [months, volume])
// );

// const lineChartOptions = {
//   title: "Real Estate Price Over Time",
//   hAxis: { title: "Months Since Start", slantedText: true },
//   vAxis: { title: "Price (억 원)", minValue: 160000000, maxValue: 240000000 },
//   legend: "none",
//   annotations: {
//     textStyle: { fontSize: 12, color: "#ff6b6b" },
//     stem: { color: "transparent" },
//   },
//   tooltip: { isHtml: true, trigger: "focus" },
// };

// const barChartOptions = {
//   title: "Transaction Volume Over Time",
//   hAxis: { title: "Months Since Start", slantedText: true },
//   vAxis: { title: "Transaction Volume", minValue: 0 },
//   legend: "none",
//   tooltip: { isHtml: true, trigger: "focus" },
// };

// const TradeChart: React.FC = () => {
//   return (
//     <div>
//       {/* Line Chart for Prices */}
//       <Chart
//         chartType="LineChart"
//         width="100%"
//         height="300px"
//         data={lineChartData}
//         options={lineChartOptions}
//       />

//       {/* Bar Chart for Transaction Volume */}
//       <Chart
//         chartType="ColumnChart"
//         width="100%"
//         height="200px"
//         data={barChartData}
//         options={barChartOptions}
//       />
//     </div>
//   );
// };

// export default TradeChart;
