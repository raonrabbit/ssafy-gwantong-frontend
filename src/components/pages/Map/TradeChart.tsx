import { useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Chart } from "react-google-charts";

const monthlyData = [
  ["날짜", "평균 가격", { role: "annotation" }, "Transaction Volume"],
  ["21.12", 220000000, "", 0],
  ["22.01", 220000000, "", 0],
  ["22.02", 220000000, "", 0],
  ["22.03", 220000000, "", 2],
  ["22.04", 220000000, "", 0],
  ["22.05", 220000000, "", 0],
  ["22.06", 220000000, "", 3],
  ["22.07", 220000000, "", 1],
  ["22.08", 220000000, "", 0],
  ["22.09", 225000000, "최고", 1],
  ["22.10", 225000000, "", 0],
  ["22.11", 225000000, "", 0],
  ["22.12", 225000000, "", 5],
  ["23.01", 225000000, "", 2],
  ["23.02", 225000000, "", 3],
  ["23.03", 225000000, "", 0],
  ["23.04", 225000000, "", 0],
  ["23.05", 180000000, "", 1],
  ["23.06", 170000000, "최저", 2],
  ["23.07", 170000000, "", 0],
  ["23.08", 176000000, "", 2],
  ["23.09", 176000000, "", 0],
  ["23.10", 176000000, "", 1],
  ["23.11", 176000000, "", 0],
  ["23.12", 176000000, "", 0],
  ["24.01", 183333333, "", 3],
  ["24.02", 183333333, "", 3],
  ["24.03", 183333333, "", 0],
  ["24.04", 183333333, "", 2],
  ["24.05", 190000000, "", 1],
  ["24.06", 197000000, "", 1],
  ["24.07", 192333333, "", 2],
  ["24.08", 187500000, "", 3],
  ["24.09", 180000000, "", 1],
  ["24.10", 218000000, "", 1],
  ["24.11", 218000000, "", 1],
];

const TradeChart: React.FC = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <div>
      {/* Line Chart for Prices */}
      <Chart
        chartType="LineChart"
        width="358px"
        height="400px"
        style={{ backgroundColor: bgColor }}
        data={monthlyData.map(([date, price, annotation]) => [date, price, annotation])}
        options={{
          title: "시세 추이",
          hAxis: { title: "Date", format: "yyyy.MM", slantedText: true },
          vAxis: { title: "가격 (억 원)", minValue: 160000000, maxValue: 240000000 },
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
        data={monthlyData.map(([date, , , volume]) => [date, volume])}
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

// import React from "react";
// import { Chart } from "react-google-charts";

// // Original data, with ""s where there are no transactions
// const rawData = [
//   ["Date", "Price", { role: "annotation" }, "Transaction Volume"],
//   ["2021-12", 220000000, "", 0],
//   ["2022-01", "", "", 0],
//   ["2022-02", "", "", 0],
//   ["2022-03", "", "", 0],
//   ["2022-04", "", "", 0],
//   ["2022-05", "", "", 0],
//   ["2022-06", "", "", 0],
//   ["2022-07", "", "", 0],
//   ["2022-08", "", "", 0],
//   ["2022-09", 225000000, "", 1],
//   ["2022-10", "", "", 0],
//   ["2022-11", "", "", 0],
//   ["2022-12", 225000000, "", 1],
//   ["2023-01", "", "", 0],
//   ["2023-02", "", "", 0],
//   ["2023-03", "", "", 0],
//   ["2023-04", "", "", 0],
//   ["2023-05", 180000000, "", 2],
//   ["2023-06", 170000000, "", 2],
//   ["2023-07", "", "", 0],
//   ["2023-08", 176000000, "", 3],
//   ["2023-09", "", "", 0],
//   ["2023-10", "", "", 0],
//   ["2023-11", "", "", 0],
//   ["2023-12", "", "", 0],
//   ["2024-01", 183333333, "최고", 3],
//   ["2024-02", "", "", 0],
//   ["2024-03", "", "", 0],
//   ["2024-04", "", "", 0],
//   ["2024-05", 190000000, "", 1],
//   ["2024-06", 197000000, "", 1],
//   ["2024-07", 192333333, "", 3],
//   ["2024-08", 187500000, "", 2],
//   ["2024-09", 180000000, "최저", 1],
//   ["2024-10", 218000000, "", 1],
//   ["2024-11", "", "", 0],
// ];

// // Base date for calculating months since start (Dec 2021)
// const baseDate = new Date(2021, 11); // December 2021

// const processChartData = (data: any) => {
//   let lastKnownPrice: any = "";
//   return data.map(([dateStr, price, annotation, volume]: any) => {
//     const [year, month] = dateStr.split("-").map(Number);
//     const date = new Date(year, month - 1);
//     const monthsSinceBase =
//       (year - baseDate.getFullYear()) * 12 + (month - 1 - baseDate.getMonth());

//     if (price === "" && lastKnownPrice !== "") {
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
